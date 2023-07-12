import { Play } from 'phosphor-react';
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

export function Home() {
    const [task, setTask] = useState('');

    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em </label>
                    <TaskInput
                        type="text"
                        list="tasks"
                        name="task"
                        id="task"
                        placeholder="De um nome para o seu projeto"
                        onChange={(e) => setTask(e.target.value)}
                        value={task}
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
                        name="time"
                        id="time"
                        placeholder="00"
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

                <StartCountdownButton disabled={task.length < 3} type="submit">
                    <Play size={24} />
                    Iniciar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}
