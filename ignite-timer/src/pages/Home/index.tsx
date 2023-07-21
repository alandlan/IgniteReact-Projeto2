import { HandPalm, Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { differenceInSeconds, min, set } from 'date-fns';
import {
    CountdownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountdownButton,
    StopCountdownButton,
    TaskInput
} from './styles';
import { useEffect, useState } from 'react';
import { cy } from 'date-fns/locale';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Nome do projeto é obrigatório'),
    minutesAmount: zod
        .number()
        .min(1, 'O tempo mínimo é de 5 minutos')
        .max(60, 'O tempo máximo é de 60 minutos')
});

// interface NewCycleFormData {
//     task: string;
//     minutesAmount: number;
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptionDate?: Date;
    finishedDate?: Date;
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [currentCycleId, setCurrentCycleId] = useState<string | null>(null);
    const [amountSeconds, setAmountSeconds] = useState(0);

    const { register, handleSubmit, watch, formState, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const activeCycle = cycles.find((cycle) => cycle.id === currentCycleId);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

    useEffect(() => {
        if (activeCycle) {
            const interval = setInterval(() => {
                const current = new Date();
                const diff = differenceInSeconds(current, activeCycle.startDate);

                if (diff >= totalSeconds) {
                    setCycles((state) => {
                        const updatedCycles = state.map((cycle) => {
                            if (cycle.id === currentCycleId) {
                                return {
                                    ...cycle,
                                    finishedDate: new Date()
                                };
                            }
                            return cycle;
                        });

                        return updatedCycles;
                    });
                    setAmountSeconds(totalSeconds);
                    clearInterval(interval);
                } else {
                    setAmountSeconds(diff);
                }
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [activeCycle, totalSeconds, currentCycleId]);

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id: id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        };

        setCycles((state) => [...state, newCycle]);
        setCurrentCycleId(id);
        setAmountSeconds(0);
        reset();
    }

    function handleInterruptCycle() {
        setCycles((state) => {
            const updatedCycles = state.map((cycle) => {
                if (cycle.id === currentCycleId) {
                    return {
                        ...cycle,
                        interruptionDate: new Date()
                    };
                }
                return cycle;
            });

            return updatedCycles;
        });

        setCurrentCycleId(null);
        setAmountSeconds(0);
    }

    const currentSeconds = activeCycle ? totalSeconds - amountSeconds : 0;

    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        document.title = `${minutes}:${seconds} | Pomodoro`;
    }, [minutes, seconds]);

    //console.log(formState.errors);

    const task = watch('task');
    const isDisabled = !task;

    console.log(cycles);

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em </label>
                    <TaskInput
                        type="text"
                        list="tasks"
                        id="task"
                        placeholder="De um nome para o seu projeto"
                        disabled={activeCycle ? true : false}
                        {...register('task')}
                    />
                    <datalist id="tasks">
                        <option value="Projeto 1" />
                        <option value="Projeto 11" />
                        <option value="Projeto 111" />
                    </datalist>
                    <label htmlFor="time">durante</label>
                    <MinutesAmountInput
                        step={1}
                        min={1}
                        max={60}
                        type="number"
                        id="time"
                        placeholder="00"
                        disabled={activeCycle ? true : false}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />
                    <span>minutos</span>
                </FormContainer>
                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                {activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} />
                        <span>Em andamento</span>
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton type="submit" disabled={isDisabled}>
                        <Play size={24} />
                        <span>Iniciar um ciclo</span>
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    );
}
