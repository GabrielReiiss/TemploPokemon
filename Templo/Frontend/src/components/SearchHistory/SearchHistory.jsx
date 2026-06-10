import { useAppSelector, useAppDispatch, deleteAll } from '../../store'
import api from "../../Services/api"
import './SearchHistory.css'

function SearchHistory() {

    const history = useAppSelector(state => state.history.historys)
    const dispatch = useAppDispatch()

    const handleDeleteAll = async () => {
        try {
            await api.delete('/history')
            dispatch(deleteAll())
        } catch (error) {
            console.error('Erro ao limpar o histórico:', error.message)
        }
    }

    return (
        <div className='container-history'>
            <div className='history-header'>
                <h2>Histórico de Pesquisa</h2>
                {history.length > 0 && <button className='btn-limpar-historico' onClick={handleDeleteAll}>Limpar histórico</button>}
            </div>
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
