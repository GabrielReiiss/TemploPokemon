import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Cadastro from './Pages/Cadastro'
import Login from './Pages/Login'
import Main from './Pages/Main'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App