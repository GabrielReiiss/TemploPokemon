import { useRef } from 'react'
import { Link } from 'react-router-dom'

function Cadastro() {

    const nameRef = useRef()
    const passwordRef = useRef()

    function handleSubmit(event) {
        event.preventDefault()

    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-black-400 p-8 border border-gray-300 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro</h2>
            <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
                <input ref={nameRef} type="text" placeholder="Nome" className="w-full bg-gray-200 text-gray-700 placeholder:text-gray-500 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input ref={passwordRef} type="password" placeholder="Senha" className="w-full bg-gray-200 text-gray-700 placeholder:text-gray-500 border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Cadastrar
                </button>
            </form>
            <Link to="/login" className="text-blue-700 hover:underline mt-4 text-center block">
                Já tem conta? Faça login
            </Link>
        </div>
    )

}

export default Cadastro