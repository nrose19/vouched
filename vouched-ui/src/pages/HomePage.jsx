import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSpots } from "../api/spots";
import { getMyFriends } from "../api/friendships";
import SpotCard from "../components/SpotCard";
import { useState, useEffect } from "react";
import SpotsMap from "../components/SpotsMap";
import FilterSidebar from "../components/FilterSideBar";
import { toggleInSet } from "../utils/toggleInSet";
import { filterSpots } from "../utils/filterSpots";
import { Link } from "react-router-dom";
import LoadingLogo from "../components/LoadingLogo";

function HomePage(){
    const { user } = useAuth();
    const navigate = useNavigate();

    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [friends, setFriends] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState(new Set());
    const [selectedPrivacy, setSelectedPrivacy] = useState(new Set());
    const [selectedStatus, setSelectedStatus] = useState(new Set());
    const [savedByFilter, setSavedByFilter] = useState("all") //all, friends, or me -- further development (filter by specific friend)
    //selected city -- further development


    const friendIds = new Set(friends.map(f => f.friendUserId));
    const categories = ["CAFE", "RESTAURANT", "BAR", "WINE_BAR", "PUB", "SALON", "SHOP", "GYM", "GALLERY", "PARK", "MARKET", "CINEMA", "MUSIC_VENUE", "OTHER"];
    const filteredForDashboard = filterSpots(spots, { selectedCategories, selectedPrivacy, savedByFilter, selectedStatus, userId: user.id, friendIds });
    
    //get spots - use effect runs once on mount
    useEffect(() => {
        
        async function fetchSpots(){
            try{
                const spotsResponse = await getSpots();
                const friendsResponse = await getMyFriends();
                setSpots(spotsResponse.data);
                setFriends(friendsResponse.data);
            } catch (err){
                setError('Unable to load spots.');
            } finally {
                setLoading(false);
            }
        }
        fetchSpots();
    },[])


    //recent spots (up to 10)
    const recentSpots = [...filteredForDashboard]
        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0,10);


    return(
        <div className="p-6">
            {/* Header */}
            <h1 className="text-rosewood text-8xl mt-5">Vouched</h1>
            
            {/* three separate columns holding filter sidebar, recent spots, and map */}
            <div className="grid grid-cols-[0.1fr_0.25fr_1fr] gap-4 max-h-185">
                {/* filtering sidebar*/}
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

                {/* recent spots, middle section of page */}
                <div className="bg-paper rounded-xl p-4 max-h-185 overflow-y-auto h-full">
                    <h2 className="font-display text-lg mb-3">Recent Spots</h2>
                    {loading && <LoadingLogo message="Recent Spots Loading..." />}
                    {error && <p>{error}</p>}
                    {/* if no spots have been saved */}
                    {!loading && recentSpots.length === 0 && (
                        <div>
                          <p>No spots saved yet. Let's add one together!</p>
                          <Link to="/add" className="font-bold text-rosewood">Add a spot</Link>
                        </div>
                      )}
                    {!loading && !error && (
                        <div className="flex flex-col gap-3">
                            {recentSpots.map(spot => <SpotCard key={spot.id} spot={spot} onDelete={(id) => setSpots(prev => prev.filter(s => s.id !== id))} />)}
                        </div>
                    )}
                </div>

                {/* map placeholder */}
                <div className="h-full">
                    <SpotsMap spots={recentSpots}/>
                </div>

            </div>
        </div>
    )
}

export default HomePage;