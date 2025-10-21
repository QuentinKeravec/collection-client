import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "./store/auth";

export default function App(){
    const { token } = useAuth();
    return (
        <div className="min-h-dvh bg-shadow-50">
            <header className="w-full border-b bg-shadow">
                <nav className="max-w-5xl mx-auto px-4 py-3 flex gap-3 items-center">
                    <NavLink to="/items" className="font-semibold">Collection</NavLink>
                    <NavLink to="/items" className="text-sm">Items</NavLink>
                    <NavLink to="/favorites" className="text-sm">Favoris</NavLink>
                    {token && (
                        <NavLink to="/new" className="ml-auto text-sm px-3 py-1.5 rounded bg-blue-600 text-white">
                            Ajouter
                        </NavLink>
                    )}
                    {!token && <NavLink to="/login" className="ml-auto text-sm">Login</NavLink>}
                </nav>
            </header>
            <main className="max-w-5xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}
