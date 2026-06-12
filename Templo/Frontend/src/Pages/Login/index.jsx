import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../Services/api'
import './index.css'

function Login() {

    const nameRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        if (nameRef.current.value.trim() === '') {
            alert('Preencha todos os campos para fazer o login!')
            return
        }
        try {
            const { data: token } = await api.post('/login', {
                name: nameRef.current.value.trim(),
                password: passwordRef.current.value.trim()
            })

            localStorage.setItem('token', token)
            navigate('/home')
        } catch (error) {
            alert('Senha ou nome incorretos.')
        }
    }

    return (
        <>
            <header>
                <h1>Templo dos Pokémons</h1>
            </header>
            <div className="auth-page">
                <div className="auth-card">
                    <h2>Login</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input ref={nameRef} type="text" placeholder="Nome" />
                        <input ref={passwordRef} type="password" placeholder="Senha" />
                        <button type="submit" className="auth-btn">Entrar</button>
                    </form>
                    <Link to="/cadastro" className="auth-link">
                        Não tem uma conta? Cadastre-se
                    </Link>
                </div>
            </div>
        </>
    )

}

export default Login
