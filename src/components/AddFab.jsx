import { NavLink } from "react-router-dom";
import { Plus } from "lucide-react";

export default function AddFab() {
    return (
        <NavLink
            to="/new"
            className="btn btn-circle fixed bottom-6 right-6 shadow-lg bg-neutral text-neutral-content hover:brightness-110"
            title="Ajouter"
            aria-label="Ajouter un item"
        >
            <Plus size={22} />
        </NavLink>
    );
}
