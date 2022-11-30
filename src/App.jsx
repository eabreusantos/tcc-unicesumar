import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import useToken from './hooks/useToken'
import Layout from './components/layout'
import { PageLoadingProvider } from './hooks/usePageLoading'
import { ToastProvider } from './hooks/useToast'
import Accounts from './pages/Accounts'
import Agendamentos from './pages/Agendamentos'
import Disponibilidades from './pages/Disponibilidades'
import AgendamentosEspec from './pages/AgendamentosEspec'

function App() {
  const {token, setToken} = useToken();
  if (!token) {
    return <PageLoadingProvider><Login setToken={setToken} /></PageLoadingProvider>
  }

  return (
    <BrowserRouter>
        <PageLoadingProvider>
        <ToastProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/meus-agendamentos" element={<Agendamentos />} />
              <Route path="/agendamentos-especialista" element={<AgendamentosEspec />} />
              <Route path="/disponibilidades" element={<Disponibilidades />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
            </Routes>
          </Layout>
        </ToastProvider>
        </PageLoadingProvider>
    </BrowserRouter>
  )
}

export default App
