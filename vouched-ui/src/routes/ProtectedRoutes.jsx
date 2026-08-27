import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const {user} = useAuth();

    if(user){
        return children;
    } else {
        return <Navigate to="/welcome"/>
    }

}

export default ProtectedRoute;