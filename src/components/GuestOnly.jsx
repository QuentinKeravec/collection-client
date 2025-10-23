import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function GuestOnly({ children }) {
    const { token } = useAuth();

    if (token) {
        return <Navigate to="/items" replace />;
    }

    return children;
}
