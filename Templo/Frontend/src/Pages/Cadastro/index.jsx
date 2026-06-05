import { useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../../Services/api'
import './index.css'

function Cadastro() {

    const nameRef = useRef()
    const passwordRef = useRef()

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            await api.post('/cadastro', {
                name: nameRef.current.value,
                password: passwordRef.current.value
            })
            alert('Usuário cadastrado com sucesso!')
        } catch (error) {
            alert('Erro ao cadastrar usuário:', error)
        }
    }

    return (
        <>
            <header>
                <h1>Templo dos Pokémons</h1>
            </header>
            <div className="auth-page">
                <div className="auth-card">
                    <h2>Cadastro</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input ref={nameRef} type="text" placeholder="Nome" />
                        <input ref={passwordRef} type="password" placeholder="Senha" />
                        <button type="submit" className="auth-btn">Cadastrar</button>
                    </form>
                    <Link to="/login" className="auth-link">
                        Já tem conta? Faça login
                    </Link>
                </div>
            </div>
        </>
    )

}

export default Cadastro
