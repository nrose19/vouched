import { NavLink, Outlet } from "react-router-dom";

const navItems = [
    {to: "/", lab: "Home"},
    {to: "/explore", lab: "Explore"},
    {to: "/friends", lab: "Friends"},
    {to: "/profile", lab: "Profile"},
    {to: "/add", lab: "Add"},
];

function Layout(){
    return (
        <div className="min-h-screen bg-paper-light pt-16">
            <Outlet />

            <nav className="fixed top-0 left-0 right-0 bg-paper flex justify-around py-4 ht-16">
                <ul>
                    {navItems.map(item =>
                        <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
                            {item.lab}
                        </NavLink>
                    )}
                </ul>
            </nav>
        </div>
    )
}

export default Layout;