import { useState, useEffect } from "react";
import { getSpots } from "../api/spots";
import SpotCard from "../components/SpotCard";
import { searchUser } from "../api/user";
import { sendFriendRequest } from "../api/friendships";


function ExplorePage() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchMode, setSearchMode] = useState("spots"); //spots or friends -- alter the render of the search 
  const [searchTerm, setSearchTerm] = useState(""); //shared by both modes
  const [friendResults, setFriendResults] = useState([]);
  const [sentRequests, setSentRequests] = useState(new Set());


  useEffect(() => {
    async function fetchData(){
      try{
        const result = await getSpots();
        setSpots(result.data);
      } catch (err){
        setError('Unable to find spots.');
      } finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  const filteredSpots = spots.filter(spot => {
    const term = searchTerm.toLowerCase();
    return(
      spot.name.toLowerCase().includes(term) ||
      spot.city.toLowerCase().includes(term) ||
      //only to include some of the filtered words, as vibetags are associated with many
      spot.vibeTags.some(tag => tag.toLowerCase().includes(term))
    );
  });

  async function handleSearch(e){
    e.preventDefault();
    setError("");
    //find if search mode is friends or not
    if (searchMode === "friends"){
      try{
        const result = await searchUsers(searchTerm);
        setFriendResults(result.data);
      } catch (err){
        setError("Could not search users.");
      }
    }
    
  }

  async function handleSendRequest(userId){
    try{
      await sendFriendRequest(userId);
      setSentRequests(prev => new Set(prev).add(userId));
    } catch (err){
      setError("Could not send request.");
    }
  }

  return(
    <div className="p-8">
      <h1 className="font-display text-3xl mb-4">Let's explore your city together!</h1>

      {/* search mode/button for each mode */}
      <div className="flex gap-2 mb-4">
        <button type="button" onClick={() => setSearchMode("spots")} className={`cursor-pointer px-4 py-2 rounded-lg ${searchMode === "spots" ? "bg-rosewood text-paper-light" : "bg-paper"}`}>
          Spots
        </button>
        <button type="button" onClick={() => setSearchMode("friends")} className={`cursor-pointer px-4 py-2 rounded-lg ${searchMode === "friends" ? "bg-rosewood text-paper-light" : "bg-paper"}`}>
          Friends
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input 
          type="text"
          placeholder={searchMode === "spots" ? "Search spots..." : "Search by name or email..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-2 flex-1"
        />
        <button type="submit" className="bg-rosewood text-paper-light px-4 rounded-lg cursor-pointer">Search</button>
      </form>
        
      {loading && <p>Loading...</p>}
      {error && <p className="text-brick text-sm">{error}</p>}
      {!loading && !error && searchMode === "spots" && (
        <div>
          {filteredSpots.map(spot => <SpotCard key={spot.id} spot={spot} />)}
        </div>
      )}

      {!loading && !error && searchMode === "friends" && (
        friendResults.map(user => (
          <div key={user.id} className="flex justify-between items-center bg-paper rounded-lg p-3 mb-2">
            <span>{user.displayName}</span>
            <button
              onClick={() => handleSendRequest(user.id)}
              className={`px-3 py-1 rounded-lg text-paper-light cursor-pointer ${sentRequests.has(user.id) ? "bg-stone" : "bg-moss"}`}
            >
              {sentRequests.has(user.id) ? "Request sent" : "Add friend"}
            </button>
          </div>
        ))
      )}
    </div>
  )
}
export default ExplorePage;