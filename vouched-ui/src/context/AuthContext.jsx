import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);

    //user state
    useEffect(() => {
        const savedUser = localStorage.getItem('user')

        if (savedUser){
            setUser(JSON.parse(savedUser));
        }
    
    },[])
    

    //login
    function login(userData){
        localStorage.setItem('token', userData.token);
         // save the full userData object, stringified, under its own key
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    }
    
    //logout
    function logout(){
        localStorage.removeItem('token');
        // remove the full user object from localStorage
        localStorage.removeItem('user');
        setUser(null);
    }

    return <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext);
}