import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "./store/auth";
import LogoutButton from "./components/LogoutButton";
import AddFab from "./components/AddFab";

export default function App(){
    const { token } = useAuth();
    return (
        <div className="min-h-dvh bg-base-200">
            <header className="w-full border-b bg-shadow">
                <nav className="max-w-5xl mx-auto px-4 py-3 flex gap-3 items-center">
                    <NavLink to="/items" className="font-semibold">Collection</NavLink>
                    <NavLink to="/items" className="text-sm">Items</NavLink>
                    <NavLink to="/favorites" className="text-sm">Favoris</NavLink>
                    <div className="ml-auto flex items-center gap-2">
                        {token && (
                            <>
                                <AddFab />
                                <LogoutButton />
                            </>
                        )}
                        {!token && (
                            <NavLink to="/login" className="text-sm">
                                Login
                            </NavLink>
                        )}
                    </div>
                </nav>
            </header>
            <main className="max-w-5xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}
