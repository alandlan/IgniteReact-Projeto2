import { useContext } from 'react';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../contexts/CyclesContext';

export default function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext);
    const { register } = useFormContext();

    return (
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
    );
}
