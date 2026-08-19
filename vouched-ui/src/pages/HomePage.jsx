import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSpots } from "../api/spots";
import SpotCard from "../components/SpotCard";
import { useState, useEffect } from "react";

function HomePage(){
    const { user } = useAuth();
    const navigate = useNavigate();

    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    //get spots - use effect runs once on mount
    useEffect(() => {
        
        async function fetchSpots(){
            try{
                const response = await getSpots();
                setSpots(response.data);
            } catch (err){
                setError('Unable to load spots.');
            } finally {
                setLoading(false);
            }
        }
        fetchSpots();
    },[])

    //recent spots (up to 10)
    const recentSpots = [...spots]
        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0,10);


    return(
        <div className="p-6">
            {/* Header */}
            <h1 className="text-rosewood text-8xl">Vouched</h1>
            
            {/* three separate columns holding filter sidebar, recent spots, and map */}
            <div className="grid grid-cols-[150px_320px_1fr] gap-4">
                {/* filtering sidebar - placeholder currently */}
                <div className="bg-paper rounded-xl flex items-center justify-center py-6">
                    <span className="[writing-mode:vertical-rl] rotate-180 font-sans text-sm text-ink">Quick Spot Filter/City Switcher</span>
                </div>
                

                {/* recent spots, middle section of page */}
                <div className="bg-paper rounded-xl p-4 max-h-150 overflow-y-auto">
                    <h2 className="font-display text-lg mb-3">Recent Spots</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                    {!loading && !error && (
                        <div className="flex flex-col gap-3">
                            {recentSpots.map(spot => <SpotCard key={spot.id} spot={spot} />)}
                        </div>
                    )}
                </div>

                {/* map placeholder */}
                <div className="bg-sage rounded-xl flex items-center justify-between text-stone font-sans">
                    static map
                </div>

            </div>
        </div>
    )
}

export default HomePage;