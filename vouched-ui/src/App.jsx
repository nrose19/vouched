import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoutes';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import Layout from './routes/Layout';
import ExplorePage from './pages/ExplorePage';
import AddSpotPage from './pages/AddSpotPage';
import FriendsPage from './pages/FriendsPage';
import ProfilePage from './pages/ProfilePage';
import ProfileOverview from './pages/ProfileOverview';
import MySpotsPage from './pages/MySpotsPage';
import MapViewPage from './pages/MapViewPage';
import FriendsFollowingPage from './pages/FriendsFollowingPage';
import WelcomePage from './pages/WelcomePage';

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/welcome' element={<WelcomePage/>} />
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>} />
      {/* current catch all for anything that isn't login/register to reroute */}
      <Route path="*" element={<WelcomePage />}/>
      
      <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/explore" element={<ExplorePage/>}/>
        <Route path="/add" element={<AddSpotPage/>}/>
        <Route path="/friends" element={<FriendsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}>
          <Route index element={<ProfileOverview />}/>
          <Route path="/profile/spots" element={<MySpotsPage />}/>
          <Route path="/profile/following" element={<FriendsFollowingPage />}/>
          <Route path="/profile/map" element={<MapViewPage />}/>
        </Route>   
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App;
