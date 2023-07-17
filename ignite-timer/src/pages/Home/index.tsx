import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
    CountdownContainer,
    FormContainer,
    HomeContainer,
    MinutesAmountInput,
    Separator,
    StartCountdownButton,
    TaskInput
} from './styles';
import { useState } from 'react';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Nome do projeto é obrigatório'),
    minutesAmount: zod
        .number()
        .min(5, 'O tempo mínimo é de 5 minutos')
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
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [currentCycleId, setCurrentCycleId] = useState<string | null>(null);

    const { register, handleSubmit, watch, formState, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id: id,
            task: data.task,
            minutesAmount: data.minutesAmount
        };

        setCycles([...cycles, newCycle]);
        setCurrentCycleId(id);
        reset();
    }

    //console.log(formState.errors);

    const task = watch('task');
    const isDisabled = !task;

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
                        {...register('task')}
                    />
                    <datalist id="tasks">
                        <option value="Projeto 1" />
                        <option value="Projeto 11" />
                        <option value="Projeto 111" />
                    </datalist>
                    <label htmlFor="time">durante</label>
                    <MinutesAmountInput
                        step={5}
                        min={5}
                        max={60}
                        type="number"
                        id="time"
                        placeholder="00"
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />
                    <span>minutos</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isDisabled} type="submit">
                    <Play size={24} />
                    Iniciar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}
