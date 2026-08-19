import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getSpots } from "../api/spots";
import { getMyFriends } from "../api/friendships";
import SpotCard from "../components/SpotCard";



function ProfilePage() {
  const { user } = useAuth();
  const [spots, setSpots] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function fetchData() {
      try{
        //fetch getSpots() and getMyFriends()
      } catch (err){
        setError("Could not load profile data.")
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  const mySpots = spots.filter(spot => spot.ownerId === user.email);
    //recent spots (up to 5)
    const myRecentSpots = [...mySpots]
        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0,5);

  //TODO friendsSpots 


  return(
    <div className="p-6">
      {/* Banner — its own block now, fixed height, no longer wrapping the avatar */}
      <div className="h-55 -mx-6 -mt-6" style={{ background: "linear-gradient(to bottom, var(--color-paper), var(--color-rosewood))" }} />

      {/* Avatar + name — sits below the banner, pulled up slightly to overlap just the bottom edge */}
      <div className="flex items-end gap-4 px-6 -mt-10 relative z-10 mb-2">
        <div className="w-35 h-35 rounded-full bg-sage text-paper-light flex items-center justify-center font-display text-4xl border-4 border-paper-light">
          {user.displayName.charAt(0).toUpperCase()}
        </div>
        <h2 className="font-logo text-6xl text-ink mb-6">{user.displayName}</h2>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-brick text-sm">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-[1fr_1fr] gap-6 mt-20">
          <div className="bg-sage rounded-xl flex items-center justify-center text-stone font-sans h-64">
            map
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-rosewood mb-2">My most recent spots:</h2>
              <div className="grid grid-cols-3 gap-2">
                {/* TODO: map first few of mySpots (consider .slice like HomePage's recentSpots) */}
                {myRecentSpots.map(spot => <SpotCard key={spot.id} spot={spot} />)}
              </div>
            </div>
            <div>
              <h2 className="font-display text-rosewood mb-2">Friends recent spots:</h2>
              <div className="grid grid-cols-3 gap-2">
                {/* TODO: map first few of friendsSpots */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

}
export default ProfilePage;