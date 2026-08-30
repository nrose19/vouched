import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSpots } from "../api/spots";
import { getMyFriends } from "../api/friendships";
import LoadingLogo from "../components/LoadingLogo";


function ProfilePage() {
  const { user } = useAuth();
  const [spots, setSpots] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function fetchData() {
      try{
        const spotResults = await getSpots();
        const friendResults = await getMyFriends();
        setSpots(spotResults.data);
        setFriends(friendResults.data);
      } catch (err){
        setError("Could not load profile data.")
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [])



  return(
    <div className="p-6">
      {/* Banner — its own block now, fixed height, no longer wrapping the avatar */}
      <div className="h-55 -mx-6 -mt-6" style={{ background: "linear-gradient(to bottom, var(--color-paper), var(--color-rosewood))" }} />

      <div className="flex items-end justify-between px-6 -mt-10 relative z-10 mb-2">
        <div className="flex items-end gap-4">
          <div className="w-35 h-35 rounded-full bg-sage text-paper-light flex items-center justify-center font-display text-4xl border-4 border-paper-light">
            {user.displayName.charAt(0).toUpperCase()}
          </div>
          <h2 className="font-logo text-6xl text-ink mb-6">{user.displayName}</h2>
        </div>

        <div className="flex gap-6 font-display mb-6">
          <NavLink to="/profile/spots" end className={({ isActive }) => isActive ? "text-rosewood" : "text-ink"}>My Spots</NavLink>
          <NavLink to="/profile/following" className={({ isActive }) => isActive ? "text-rosewood" : "text-ink"}>My Friends</NavLink>
          <NavLink to="/profile/map" className={({ isActive }) => isActive ? "text-rosewood" : "text-ink"}>Map View</NavLink>
        </div>
      </div>
        
      {loading && <LoadingLogo message="Loading..."/>}
      {error && <p className="text-brick text-sm">{error}</p>}

      {!loading && !error && <Outlet context={{ spots, following: friends, user }}/>}

    </div>
  )

}
export default ProfilePage;