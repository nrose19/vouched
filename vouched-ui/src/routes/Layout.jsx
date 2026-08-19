import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import navLogo from "../assets/navbar_logo.png";

const navItems = [
    {to: "/", lab: "Home"},
    {to: "/explore", lab: "Explore"},
    {to: "/friends", lab: "Friends"},
    {to: "/profile", lab: "Profile"},
    {to: "/add", lab: "Add"},
];

function Layout(){
    const {user, logout} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //creates reference that stays attached to real DOM element across renders w/out causing re-render
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event){
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-paper-light">
            <nav className="h-16 bg-paper flex items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <div>
                        <NavLink to="/" className="font-logo text-3xl text-rosewood mb-1 flex items-center">
                            <img src={navLogo} alt="navbar logo" className="max-w-none h-10 mb-1"/>
                            Vouched
                        </NavLink>
                    </div>
                    <NavLink to="/" className={({ isActive }) => isActive ? "font-display text-rosewood" : "font-display text-ink"}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/explore" className={({ isActive }) => isActive ? "font-display text-rosewood" : "font-display text-ink"}>
                        Explore
                    </NavLink>
                    <NavLink to="/add" className={({ isActive }) => isActive ? "font-display text-rosewood" : "font-display text-ink"}>
                        Add Spot
                    </NavLink>
                </div>

                <div className="relative" ref={menuRef}>
                    <button 
                        onClick={() => setIsMenuOpen(prev => !prev)}
                        className="w-10 h-10 rounded-full bg-rosewood text-paper-light flex items-center justify-center font-logo"
                    >
                        {user.displayName.charAt(0).toUpperCase()}
                    </button>

                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-paper rounded-lg shadow-lg overflow-hidden">
                            <NavLink to="/profile" className="block px-4 py-2 hover:bg-paper-light font-sans" onClick={() => setIsMenuOpen(false)}>
                                Profile
                            </NavLink>
                            <NavLink to="/friends" className="block px-4 py-2 hover:bg-paper-light font-sans" onClick={() => setIsMenuOpen(false)}>
                                Friends
                            </NavLink>
                            <NavLink onClick={logout} className="block px-4 py-2 hover:bg-paper-light font-sans">
                                Logout
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout;