import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';
import { HistoryContainer, HistoryList, Status } from './styles';

export function History() {
    const { cycles } = useContext(CyclesContext);

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duracao</th>
                            <th>Inicio</th>
                            <th>
                                <Status statusColor="yellow">Concluido</Status>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Projeto 1</td>
                            <td>25 minutos</td>
                            <td>há 2 meses</td>
                            <td>
                                <Status statusColor="green">Concluido</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Projeto 2</td>
                            <td>25 minutos</td>
                            <td>há 2 meses</td>
                            <td>
                                <Status statusColor="red">Concluido</Status>
                            </td>
                        </tr>
                        <tr>
                            <td>Projeto 3</td>
                            <td>25 minutos</td>
                            <td>há 2 meses</td>
                            <td>
                                <Status statusColor="yellow">Concluido</Status>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}
