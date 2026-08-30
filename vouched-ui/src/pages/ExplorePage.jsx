import { useState, useEffect } from "react";
import { getSpots } from "../api/spots";
import SpotCard from "../components/SpotCard";
import { searchUser } from "../api/user";
import { sendFriendRequest } from "../api/friendships";
import SpotsMap from "../components/SpotsMap";
import { Link } from "react-router-dom";
import FilterSidebar from "../components/FilterSideBar";
import { useAuth } from "../context/AuthContext";
import { getMyFriends } from "../api/friendships";
import { toggleInSet } from "../utils/toggleInSet";
import { filterSpots } from "../utils/filterSpots";

function ExplorePage() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchMode, setSearchMode] = useState("spots"); //spots or friends -- alter the render of the search
  const [viewMode, setViewMode] = useState("list") // spot/friends list view vs map view 
  const [searchTerm, setSearchTerm] = useState(""); //shared by both modes
  const [friendResults, setFriendResults] = useState([]);
  const [sentRequests, setSentRequests] = useState(new Set());

// Filtered Side Bar -- filtered state 
  const categories = ["CAFE", "RESTAURANT", "BAR", "WINE_BAR", "PUB", "SALON", "SHOP", "GYM", "GALLERY", "PARK", "MARKET", "CINEMA", "MUSIC_VENUE", "OTHER"];
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [selectedPrivacy, setSelectedPrivacy] = useState(new Set());
  const [selectedStatus, setSelectedStatus] = useState(new Set());
  const [savedByFilter, setSavedByFilter] = useState("all");

  useEffect(() => {
    async function fetchData(){
      try{
        const spotResults = await getSpots();
        const friendResults = await getMyFriends();
        setSpots(spotResults.data);
        setFriends(friendResults.data);
      } catch (err){
        setError('Unable to find spots.');
      } finally{
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  const friendIds = new Set(friends.map(f => f.friendUserId));

  const sidebarFiltered = filterSpots(spots, {
    selectedCategories,
    selectedPrivacy,
    savedByFilter,
    selectedStatus,
    userId: user.id,
    friendIds,
  });

  const filteredSpots = sidebarFiltered.filter(spot => {
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
        const result = await searchUser(searchTerm);
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
    <div className="p-15">
      <h1 className="text-5xl">Let's explore your city together!</h1>

      {/* list/map view toggle */}
      <div className="flex items-center justify-between mb-2">
        {/* search mode/button for each mode */}
        <div className="flex gap-2 mb-4">
          <button type="button" onClick={() => setSearchMode("spots")} className={`cursor-pointer px-4 py-2 rounded-lg ${searchMode === "spots" ? "bg-rosewood text-paper-light" : "bg-paper"}`}>
            Spots
          </button>
          <button type="button" onClick={() => setSearchMode("friends")} className={`cursor-pointer px-4 py-2 rounded-lg ${searchMode === "friends" ? "bg-rosewood text-paper-light" : "bg-paper"}`}>
            Friends
          </button>
        </div>

        {/* mapview */}
        <button 
        type="button"
        onClick={() => setViewMode(prev => prev ==="list" ? "map" : "list")}
        className={`font-display ${viewMode === "map" ? "text-rosewood font-bold" : "text-ink"}`}
        >
          Map View
        </button>
      </div>
      

      <form onSubmit={handleSearch} className="flex gap-2 mb-2">
        <input 
          type="text"
          placeholder={searchMode === "spots" ? "Search spots..." : "Search by name or email..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full bg-paper"
        />
        <button type="submit" className="bg-rosewood text-paper-light px-4 rounded-lg cursor-pointer">Search</button>
      </form>
        
      {loading && <p>Loading...</p>}
      {error && <p className="text-brick text-sm">{error}</p>}

      <div className="grid grid-cols-[200px_1fr] gap-4 mt-6">
              {searchMode === "spots" ? (
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onToggleCategory={(category) => toggleInSet(setSelectedCategories, category)}
                  selectedPrivacy={selectedPrivacy}
                  onTogglePrivacy={(level) => toggleInSet(setSelectedPrivacy, level)}
                  savedByFilter={savedByFilter}
                  onSavedByChange={setSavedByFilter}
                  selectedStatus={selectedStatus}
                  onToggleStatus={(status) => toggleInSet(setSelectedStatus, status)}
                />
              ) : (
                <div />
              )}

              <div className="min-w-0">
                {!loading && !error && searchMode === "spots" && filteredSpots.length === 0 && (
                  <div>
                    <p>No spots saved yet. Let's add one together!</p>
                    <Link to="/add" className="font-bold text-rosewood">Add a spot</Link>
                    </div>
                )}

                {/* map view */}
                {!loading && !error && viewMode === "map" && (
                    <div className="h-screen">
                        <SpotsMap spots={filteredSpots}/>
                    </div>
                )}

                {/* list view + spots view  */}
                {!loading && !error && viewMode === "list" && searchMode === "spots" && (
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    {filteredSpots.map(spot => <SpotCard key={spot.id} spot={spot} onDelete={(id) => setSpots(prev => prev.filter(s => s.id !== id))} />)}
                  </div>
                )}

                {/* list view + friends view  */}
                {!loading && !error && searchMode === "friends" && friendResults.length === 0 && (
                  <div className="text-center">
                    <p>Let's find some trusted sources, together. Search here for friends.</p>
                    </div>
                )}

                {!loading && !error && viewMode=== "list" && searchMode === "friends" && (
                  <div className="flex flex-col gap-3">
                    {friendResults.map(user => (
                      <div key={user.id} className="flex justify-between items-center bg-paper rounded-lg p-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-rosewood text-paper-light flex items-center justify-center font-display">
                            {user.displayName.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-display">{user.displayName}</span>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-sm text-stone">{user.spotCount} spots saved</span>
                          <button
                            onClick={() => handleSendRequest(user.id)}
                            className={`px-3 py-1 rounded-lg text-paper-light cursor-pointer ${sentRequests.has(user.id) ? "bg-stone" : "bg-moss"}`}
                          >
                            {sentRequests.has(user.id) ? "Request sent" : "Add friend"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
      </div>
    </div>
  )
}
export default ExplorePage;