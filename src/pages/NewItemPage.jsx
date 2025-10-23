import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from '../api';
import SelectType from "../components/SelectType";

export default function NewItemPage(){
    const nav = useNavigate();
    const [form, setForm] = useState({
        title: "",
        type: "",
        year: "",
        author: "",
        description: "",
        tags: "", // saisi "scifi, classic"
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError]   = useState("");
    const [type, setType] = useState("");

    const onChange = (e) => {
        const { name, value, files } = e.target;
        if (files) setForm(s => ({ ...s, image: files[0] }));
        else setForm(s => ({ ...s, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Vérifier qu'on passe bien ici
            console.log("[NewItem] submit start");

            const data = new FormData();
            data.append("title", form.title.trim());
            data.append("type", type);
            if (form.year) data.append("year", String(form.year));
            if (form.author) data.append("author", form.author);
            if (form.description) data.append("description", form.description);
            if (form.image) data.append("image", form.image);

            // tags: "scifi, classic" -> tags[]=scifi, tags[]=classic
            form.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .forEach((t) => data.append("tags[]", t));

            // Logge tout ce qu'on envoie
            for (const [k, v] of data.entries()) {
                console.log("[NewItem] formdata", k, v);
            }

            const res = await api.post("/items", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("[NewItem] success", res.status, res.data);
            nav("/items"); // garde commenté le temps du debug
        } catch (err) {
            // On logge TOUT
            console.error("[NewItem] error", err?.response?.status, err?.response?.data, err);

            // Affichage plus parlant
            const server = err?.response?.data;
            if (server?.errors) {
                // transforme {field: [msg,...]} -> string lisible
                const messages = Object.entries(server.errors)
                    .map(([field, arr]) => `${field}: ${arr.join(", ")}`)
                    .join(" | ");
                setError(messages || server.message || "Erreur d’envoi");
            } else {
                setError(server?.message || JSON.stringify(server) || "Erreur d’envoi");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-box p-8 max-w-xl mx-auto bg-base-100 shadow">
            <h1 className="text-2xl font-semibold mb-4">Nouvel item</h1>

            {error && <div className="mb-3 p-3 rounded bg-red-100 text-red-700">{error}</div>}

            <form onSubmit={onSubmit} className="space-y-3">
                <div>
                    <label className="block text-sm mb-1">Titre *</label>
                    <input
                        className="input input-bordered w-full px-3 py-2"
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        onChange={onChange}
                    />
                </div>

                <div>
                    <div>
                        <label className="block text-sm mb-1">Type *</label>
                        <SelectType value={type} onChange={setType} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-sm mb-1">Année</label>
                        <input
                            type="number"
                            min="1800"
                            max="2100"
                            className="input input-bordered w-full px-3 py-2"
                            name="year"
                            value={form.year}
                            onChange={onChange}
                            placeholder="1999"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Auteur / Réalisateur</label>
                        <input
                            className="input input-bordered w-full px-3 py-2"
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
                        className="textarea textarea-bordered w-full px-3 py-2"
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
                        className="input input-bordered w-full px-3 py-2"
                        name="tags"
                        value={form.tags}
                        onChange={onChange}
                        placeholder="scifi, classic"
                    />
                </div>

                <div className="card-actions justify-end mt-4">
                    <button className={`btn btn-primary ${loading && "btn-disabled"}`}>{loading ? "Ajout..." : "Ajouter"}</button>
                </div>
            </form>
        </div>
    );
}
