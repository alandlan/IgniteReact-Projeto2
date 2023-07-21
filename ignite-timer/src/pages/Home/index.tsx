import { HandPalm, Play } from 'phosphor-react';
import { createContext, useState } from 'react';
import NewCycleForm from './NewCycleForm';
import { Countdown } from './CountDown';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptionDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextData {
    activeCycle: Cycle | undefined;
    currentCycleId: string | null;
    amountSeconds: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextData);

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Nome do projeto é obrigatório'),
    minutesAmount: zod
        .number()
        .min(1, 'O tempo mínimo é de 5 minutos')
        .max(60, 'O tempo máximo é de 60 minutos')
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [currentCycleId, setCurrentCycleId] = useState<string | null>(null);
    const [amountSeconds, setAmountSeconds] = useState(0);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    const activeCycle = cycles.find((cycle) => cycle.id === currentCycleId);

    function markCurrentCycleAsFinished() {
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
    }

    function setSecondsPassed(seconds: number) {
        setAmountSeconds(seconds);
    }

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

    //console.log(formState.errors);

    const task = watch('task');
    const isDisabled = !task;

    console.log(cycles);

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider
                    value={{
                        activeCycle,
                        currentCycleId,
                        markCurrentCycleAsFinished,
                        amountSeconds,
                        setSecondsPassed
                    }}
                >
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>

                    <Countdown />
                </CyclesContext.Provider>

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
