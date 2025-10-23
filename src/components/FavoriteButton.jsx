import { useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "../store/auth";
import { toggleFavorite } from "../api";

export default function FavoriteButton({ itemId, initial }) {
    const { token } = useAuth();
    const [fav, setFav] = useState(initial);
    const [toast, setToast] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault();
        if (!token) return alert("Connecte-toi pour ajouter aux favoris");

        try {
            await toggleFavorite(itemId, fav);
            setFav(!fav);

            // message dynamique
            setToast(fav ? "Retiré des favoris 💔" : "Ajouté aux favoris ❤️");

            // disparition auto
            setTimeout(() => setToast(null), 2000);
        } catch (err) {
            console.error(err);
            setToast("Erreur réseau ⚠️");
            setTimeout(() => setToast(null), 2000);
        }
    };

    return (
        <>
            <button
                onClick={handleClick}
                className={`btn btn-ghost btn-circle transition ${
                    fav ? "text-red-500" : "text-gray-400"
                }`}
                title={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
                <Heart fill={fav ? "red" : "none"} />
            </button>

            {toast && (
                <div className="toast toast-end z-[60]">
                    <div
                        className={`alert ${
                            fav ? "alert-error" : "alert-success"
                        } shadow-md`}
                    >
                        <span>{toast}</span>
                    </div>
                </div>
            )}
        </>
    );
}
