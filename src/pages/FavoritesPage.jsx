import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFavorites } from "../api";
import FavoriteButton from "../components/FavoriteButton";

export default function FavoritesPage() {
    const [favs, setFavs] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchFavorites();
                setFavs(res);
            } catch (err) {
                console.error("Erreur lors du chargement des favoris :", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!favs || favs.length === 0) {
        return (
            <div className="text-center py-12">
                <h1 className="text-2xl font-semibold mb-2">Aucun favori 😢</h1>
                <p className="opacity-70">
                    Tu peux ajouter des favoris depuis la page <Link to="/items" className="link">Collection</Link>.
                </p>
            </div>
        );
    }

    const placeholder = "/no-image.jpg";

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-4">Mes favoris ❤️</h1>

            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {favs.map((it) => (
                    <Link
                        key={it.id}
                        to={`/items/${it.id}`}
                        className="card bg-base-100 shadow hover:shadow-lg transition"
                    >
                        <figure>
                            <img
                                src={it.image_url || placeholder}
                                alt={it.title}
                                className="w-full h-32 object-cover"
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">{it.title}</h2>
                            {it.description && (
                                <p className="text-sm opacity-80 line-clamp-3">{it.description}</p>
                            )}

                            <div className="card-actions justify-end">
                                <FavoriteButton itemId={it.id} initial={true} />
                            </div>
                        </div>
                    </Link>
                ))}
            </ul>
        </div>
    );
}
