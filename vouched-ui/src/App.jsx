import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>} />
      {/* current catch all for anything that isn't login/register to reroute */}
      <Route path="*" element={<LoginPage/>}/>
      <Route path='/' element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
