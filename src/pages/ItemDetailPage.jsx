import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getItem, deleteItem } from "../api";

export default function ItemDetailPage() {
    const { id } = useParams();
    const nav = useNavigate();
    const [item, setItem] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getItem(id)
            .then(setItem)
            .catch((e) => setError(e?.response?.data?.message || "Erreur chargement"));
    }, [id]);

    if (error) return <div className="alert alert-error">{error}</div>;
    if (!item) return <div className="text-center mt-10">Chargement...</div>;

    const placeholder = "/no-image.jpg";

    const handleDelete = async () => {
        if (confirm("Supprimer cet item ?")) {
            await deleteItem(item.id);
            nav("/items");
        }
    };

    return (
        <div className="max-w-2xl mx-auto card bg-base-100 shadow-xl">
            <figure>
                <img
                    src={item.image_url || placeholder}
                    alt={item.title}
                    className="w-full object-cover h-64"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="text-sm opacity-70">{item.type} • {item.year}</p>
                <p>{item.description}</p>
                <div className="flex gap-2 flex-wrap mt-2">
                    {item.tags.map((t) => (
                        <span key={t} className="badge badge-outline">{t}</span>
                    ))}
                </div>

                <div className="card-actions justify-end mt-4">
                    <Link to={`/edit/${item.id}`} className="btn btn-primary">Modifier</Link>
                    <button onClick={handleDelete} className="btn btn-error">Supprimer</button>
                </div>
            </div>
        </div>
    );
}
