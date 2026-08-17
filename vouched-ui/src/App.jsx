import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoutes'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Layout from './routes/Layout'
import ExplorePage from './pages/ExplorePage'
import AddSpotPage from './pages/AddSpotPage'
import FriendsPage from './pages/FriendsPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>} />
      {/* current catch all for anything that isn't login/register to reroute */}
      <Route path="*" element={<LoginPage/>}/>
      <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/explore" element={<ExplorePage/>}/>
        <Route path="/add" element={<AddSpotPage/>}/>
        <Route path="/friends" element={<FriendsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
