import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Cadastro from './Pages/Cadastro'
import Login from './Pages/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App