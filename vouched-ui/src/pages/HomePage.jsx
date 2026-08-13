import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/auth";

function HomePage(){
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // call logout()
    function handleLogout(e){
        logout();
        navigate('/login');
    }


    return(
        <div className="min-h-screen bg-paper-light p-8">
            <h1 className="text-rosewood font-logo text-6xl mb-4">Vouched</h1>
            <h2>Welcome {user.displayName}</h2>
            <button onClick={handleLogout} className="font-display bg-rosewood text-paper-light rounded-lg py-2">
                Logout
            </button>
        </div>
    )
}

export default HomePage;