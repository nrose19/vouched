import { useState, useEffect, useRef } from "react";
import { getSpots } from "../api/spots";
import { getMyFriends } from "../api/friendships";
import { useAuth } from "../context/AuthContext";
import SpotCard from "../components/SpotCard";


function FriendsPage(){
    const {user} = useAuth();
    const [spots, setSpots] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [viewMode, setViewMode] = useState("list"); //list or map option

    useEffect(() =>{
        async function fetchData(){
            try{
                const spotResult = await getSpots();
                const friendResults = await getMyFriends();
                setFriends(friendResults.data);
                setSpots(spotResult.data);
            } catch (err){
                setError('Unable to find spots.');
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, []);


    const friendIds = new Set(friends.map(f => f.friendUserId));
    const friendsSpots = spots.filter(spot => friendIds.has(spot.ownerId));


    //group filtered spots by category 
    const groupedSpots = friendsSpots.reduce((groups, spot) => {
        const category = spot.category;

        if(!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(spot);

        return groups;
    }, {});
    
            
    //scroll feature
    const myScrollRef = useRef(null);
    const friendsScrollRef = useRef(null);

    function scrollRight(ref){
        ref.current?.scrollBy({ left: 300, behavior: "smooth"})
    }

    return(
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-5xl text-rosewood">My Friends Spots</h1>
                <button
                    type="button"
                    onClick={() => setViewMode(prev => prev === "list" ? "map" : "list")}
                    className={`font-display ${viewMode === "map" ? "text-rosewood font-bold" : "text-ink"}`}
                >
                    Map View
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-brick text-sm">{error}</p>}

            {!loading && !error && viewMode === "map" && (
                <div className="bg-sage rounded-xl flex items-center justify-center text-stone font-sans h-96">
                    Map placeholder
                </div>
            )}

            {!loading && !error && viewMode === "list" && (
                <div>
                    {Object.entries(groupedSpots).map(([category, categorySpots]) =>
                        <div key={category} className="mb-8">
                            <h2 className="font-display text-rosewood mb-2">{category}</h2>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {categorySpots.slice(0,20).map(spot => (
                                    <div key={spot.id} className="shrink-0 w-70">
                                        <SpotCard spot={spot} />
                                    </div>
                                ))}
                            </div>
                            <button className="text-rosewood text-sm mt-1">View All</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default FriendsPage;