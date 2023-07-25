import { HandPalm, Play } from 'phosphor-react';
import NewCycleForm from './NewCycleForm';
import { Countdown } from './CountDown';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(5, 'Nome do projeto é obrigatório'),
    minutesAmount: zod
        .number()
        .min(5, 'O tempo mínimo é de 5 minutos')
        .max(60, 'O tempo máximo é de 60 minutos')
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data);
        reset();
    }

    const task = watch('task');
    const isDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>

                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
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
