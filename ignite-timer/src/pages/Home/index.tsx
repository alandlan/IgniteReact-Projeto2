import { Play } from 'phosphor-react';
import { CountdownContainer, FormContainer, HomeContainer, Separator } from './styles';

export function Home() {
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em </label>
                    <input type="text" name="task" id="task" />
                    <label htmlFor="time">durante</label>
                    <input type="number" name="time" id="time" />
                </FormContainer>

                <span>minutos</span>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <button type="submit">
                    <Play size={24} />
                    Iniciar
                </button>
            </form>
        </HomeContainer>
    );
}
