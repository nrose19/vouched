import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSpots } from "../api/spots";
import SpotCard from "../components/SpotCard";
import { useState, useEffect } from "react";

function HomePage(){
    const { user, logout } = useAuth();
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


    // call logout()
    function handleLogout(e){
        logout();
        navigate('/login');
    }


    return(
        <div className="min-h-screen bg-paper-light p-8">
            <h1 className="text-rosewood font-logo text-6xl mb-4">Vouched</h1>
            <h2>Welcome {user.displayName}</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div>
                    {spots.map(spot => <SpotCard key={spot.id} spot={spot} />)}
                </div>
            )}
            <button onClick={handleLogout} className="font-display bg-rosewood text-paper-light rounded-lg py-2">
                Logout
            </button>
        </div>
    )
}

export default HomePage;