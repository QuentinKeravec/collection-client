import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import LogoutButton from "./LogoutButton";
import { SquarePlus, LogIn } from "lucide-react";

const navLinkBase =
    "px-3 py-2 rounded hover:bg-base-200 transition";
const navLinkActive = "font-semibold underline";

export default function Navbar() {
    const { token } = useAuth();

    return (
        <div className="navbar bg-base-100 shadow-sm">
            {/* START: menu hamburger (mobile) */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        {/* hamburger icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>

                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                        <li>
                            <NavLink to="/items"
                                     className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>
                                Items
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/favorites"
                                     className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>
                                Favoris
                            </NavLink>
                        </li>

                        {!token && (
                            <li>
                                <NavLink to="/login"
                                         className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : ""}`}>
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* CENTER: brand */}
            <div className="navbar-center">
                <Link to="/items" className="btn btn-ghost text-xl">
                    CollectionAPI
                </Link>
            </div>

            {/* END: icônes à droite */}
            <div className="navbar-end gap-1">
                {token ? (
                    <>
                        {/* Logout (icône) */}
                        <LogoutButton />
                    </>
                ) : (
                    <NavLink to="/login" className="btn btn-ghost btn-circle" title="Login">
                        <LogIn size={18} />
                    </NavLink>
                )}
            </div>
        </div>
    );
}
