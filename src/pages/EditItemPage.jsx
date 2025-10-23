import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, updateItem } from "../api";

const TYPES = ["movie", "book", "game", "manga", "anime", "music"];

export default function EditItemPage() {
    const { id } = useParams();
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

    if (!form) return <div>Chargement...</div>;

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (files) setForm((s) => ({ ...s, image: files[0] }));
        else setForm((s) => ({ ...s, [name]: value }));
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
        <div className="max-w-xl mx-auto">
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
                           className="file-input file-input-bordered w-full" />
                </div>

                <input className="input input-bordered w-full" name="title" value={form.title} onChange={onChange}/>
                <select className="select select-bordered w-full" name="type" value={form.type} onChange={onChange}>
                    {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
                <input className="input input-bordered w-full" name="year" value={form.year || ""} onChange={onChange}/>
                <input className="input input-bordered w-full" name="author" value={form.author || ""} onChange={onChange}/>
                <textarea className="textarea textarea-bordered w-full" name="description" value={form.description || ""} onChange={onChange}/>
                <input className="input input-bordered w-full" name="tags" value={form.tags} onChange={onChange} placeholder="tags séparés par virgule"/>

                <button className={`btn btn-primary ${loading && "btn-disabled"}`}>{loading ? "Sauvegarde..." : "Enregistrer"}</button>
            </form>
        </div>
    );
}
