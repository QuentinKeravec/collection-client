import { LogOut } from "lucide-react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8000/api/logout", {}, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
        } catch (e) {
            console.error(e);
        } finally {
            logout();
            navigate("/login", { replace: true });
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="btn btn-ghost btn-sm text-error hover:text-error-content"
            title="Se déconnecter"
        >
            <LogOut size={18} />
        </button>
    );
}
