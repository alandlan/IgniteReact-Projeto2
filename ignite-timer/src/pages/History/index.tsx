import { HistoryContainer, HistoryList } from './styles';

export function History() {
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
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Projeto 1</td>
                            <td>25 minutos</td>
                            <td>há 2 meses</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Projeto 2</td>
                            <td>25 minutos</td>
                            <td>há 2 meses</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Projeto 3</td>
                            <td>25 minutos</td>
                            <td>há 2 meses</td>
                            <td>Concluído</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}
