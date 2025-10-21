import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../api";

const TYPES = ["movie","book","game","manga","anime","music"];

export default function NewItemPage(){
    const nav = useNavigate();
    const [form, setForm] = useState({
        title: "",
        type: "",
        year: "",
        author: "",
        description: "",
        tags: "", // saisi "scifi, classic"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError]   = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(s => ({ ...s, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(""); setLoading(true);
        try {
            const payload = {
                title: form.title.trim(),
                type: form.type,
                year: form.year ? Number(form.year) : null,
                author: form.author || null,
                description: form.description || null,
                tags: form.tags
                    ? form.tags.split(",").map(t => t.trim()).filter(Boolean)
                    : [],
            };
            await createItem(payload);
            nav("/items"); // retour à la liste
        } catch (err) {
            const msg = err?.response?.data?.message
                || (Array.isArray(err?.response?.data?.errors)
                    ? err.response.data.errors.join(", ")
                    : "Impossible d’ajouter l’item");
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Nouvel item</h1>

            {error && <div className="mb-3 p-3 rounded bg-red-100 text-red-700">{error}</div>}

            <form onSubmit={onSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm mb-1">Titre *</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Type *</label>
                    <select
                        className="w-full border rounded px-3 py-2"
                        name="type"
                        value={form.type}
                        onChange={onChange}
                        required
                    >
                        <option value="">— choisir —</option>
                        {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm mb-1">Année</label>
                        <input
                            type="number"
                            min="1800"
                            max="2100"
                            className="w-full border rounded px-3 py-2"
                            name="year"
                            value={form.year}
                            onChange={onChange}
                            placeholder="1999"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Auteur / Réalisateur</label>
                        <input
                            className="w-full border rounded px-3 py-2"
                            name="author"
                            value={form.author}
                            onChange={onChange}
                            placeholder="Wachowski…"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-1">Description</label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        rows={4}
                        name="description"
                        value={form.description}
                        onChange={onChange}
                        placeholder="Résumé, notes…"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Tags (séparés par des virgules)</label>
                    <input
                        className="w-full border rounded px-3 py-2"
                        name="tags"
                        value={form.tags}
                        onChange={onChange}
                        placeholder="scifi, classic"
                    />
                </div>

                <div className="pt-2">
                    <button
                        className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                        disabled={loading}
                    >
                        {loading ? "Ajout…" : "Ajouter"}
                    </button>
                </div>
            </form>
        </div>
    );
}
