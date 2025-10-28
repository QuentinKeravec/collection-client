import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getItem, updateItem} from "../api";
import SelectType from "../components/SelectType.jsx";

const TYPES = ["movie", "book", "game", "manga", "anime", "music"];

export default function EditItemPage() {
    const {id} = useParams();
    const nav = useNavigate();
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getItem(id).then((data) => {
            setForm({
                ...data,
                tags: data.tags.join(", "),
                image: null,
            });
        });
    }, [id]);

    if (!form) return (
        <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );

    const onChange = (e) => {
        const {name, value, files} = e.target;
        if (files) setForm((s) => ({...s, image: files[0]}));
        else setForm((s) => ({...s, [name]: value}));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            ["title", "type", "year", "author", "description"].forEach((f) => {
                if (form[f]) data.append(f, form[f]);
            });
            if (form.image) data.append("image", form.image);
            form.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .forEach((t) => data.append("tags[]", t));

            await updateItem(id, data);
            nav(`/items/${id}`);
        } catch (err) {
            setError(err?.response?.data?.message || "Erreur édition");
        } finally {
            setLoading(false);
        }
    };

    const placeholder = "/no-image.jpg";

    return (
        <div className="rounded-box p-8 max-w-xl mx-auto bg-base-100 shadow">
            <h1 className="text-2xl font-semibold mb-4">Modifier l’item</h1>

            {error && <div className="alert alert-error mb-3">{error}</div>}

            <form onSubmit={onSubmit} className="space-y-3">
                <div>
                    <img
                        src={form.image_url || placeholder}
                        alt=""
                        className="w-full h-48 object-cover rounded mb-2"
                    />
                    <input type="file" name="image" onChange={onChange}
                           className="file-input file-input-bordered w-full"/>
                </div>

                <div>
                    <label className="block text-sm mb-1">Titre *</label>
                    <input className="input input-bordered w-full" name="title" value={form.title} onChange={onChange}/>
                </div>

                <div>
                    <div>
                        <label className="block text-sm mb-1">Type *</label>
                        <select className="select select-bordered w-full" name="type" value={form.type} onChange={onChange}>
                            {TYPES.map((t) => <option key={t}>{t}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm mb-1">Année</label>
                        <input className="input input-bordered w-full placeholder:text-gray-400" name="year" value={form.year || ""} onChange={onChange} placeholder="1999"/>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Auteur / Réalisateur</label>
                        <input className="input input-bordered w-full placeholder:text-gray-400" name="author" value={form.author || "" } placeholder="Wachowski…"
                               onChange={onChange}/>
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea className="textarea textarea-bordered w-full placeholder:text-gray-400" name="description"
                              value={form.description || ""} onChange={onChange} placeholder="Résumé, notes…"/>
                </div>

                <div>
                    <label className="block text-sm mb-1">Tags (séparés par des virgules)</label>
                    <input className="input input-bordered w-full placeholder:text-gray-400" name="tags" value={form.tags} onChange={onChange}
                           placeholder="scifi, classic"/>
                </div>


                <div className="card-actions justify-end mt-4">
                    <button
                        className={`btn btn-primary ${loading && "btn-disabled"}`}>{loading ? "Sauvegarde..." : "Enregistrer"}
                    </button>
                </div>
            </form>
        </div>
    );
}