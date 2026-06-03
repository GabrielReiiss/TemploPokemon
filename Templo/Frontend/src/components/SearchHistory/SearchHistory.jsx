import { useAppSelector } from '../../store'
import './SearchHistory.css'

function SearchHistory() {

    const history = useAppSelector(state => state.history.historys)

    return (
        <div className='container-history'>
            <h2>Histórico de Pesquisa</h2>
            {history.length === 0 ?
                <div className="nenhuma-pesquisa"><p>Nenhuma pesquisa realizada ainda. Busque um Pokémon para começar!</p></div>
                :
                <table className='history-table'>
                    <thead>
                        <tr>
                            <th>Termo Pesquisado</th>
                            <th>Status</th>
                            <th>Horário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td>{item.pokemon}</td>
                                <td className={item.status === 'Sucesso' ? 'status-sucesso' : 'status-erro'}>
                                    {item.status}
                                </td>
                                <td>{item.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default SearchHistory
