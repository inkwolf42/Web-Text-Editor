import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RegisterPage from './pages/Rgister'
import LoginPage from './pages/Login'
import Auth from './layouts/Auth'
import NotAuth from './layouts/NotAuth'
import RedirectPage from './pages/RedirectPage'

export default function App() {
  const [count, setCount] = useState(0)

  return <Routes>
    <Route path='/' element={<Auth/>}>
        <Route path='/' element={<Home/>}/>
    </Route>
    <Route path='/' element={<NotAuth/>}>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/auth/callback' element={<RedirectPage/>}/>
    </Route>
  </Routes>
}

