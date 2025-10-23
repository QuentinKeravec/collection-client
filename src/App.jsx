import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddFab from "./components/AddFab";

export default function App(){
    return (
        <div className="min-h-dvh bg-base-200">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-8">
                <Outlet />
                <AddFab />
            </main>
        </div>
    );
}