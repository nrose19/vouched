import { NavLink, Outlet } from "react-router-dom";

const navItems = [
    {to: "/", lab: "Home"},
];

function Layout(){
    return (
        <div className="min-h-screen bg-paper-light pb-20">
            <Outlet />

            <nav className="fixed bottom-0 left-0 right-0 bg-paper flex justify-around py-3">

            </nav>
        </div>
    )
}

export default Layout;