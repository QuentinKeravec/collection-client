import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function LoginPage(){
    const { login } = useAuth();
    const nav = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    const submit = async (e)=>{
        e.preventDefault();
        setError(""); setLoading(true);
        try{
            await login(email, password);
            nav("/items");
        }catch(err){
            setError(err?.response?.data?.message || "Identifiants invalides");
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70dvh] grid place-items-center">
            <form onSubmit={submit} className="card w-full max-w-sm bg-base-100 shadow">
                <div className="card-body">
                    <h2 className="card-title">Connexion</h2>

                    {error && <div className="alert alert-error">{error}</div>}

                    <label className="form-control">
            <span className="label">
              <span className="label-text">Email</span>
            </span>
                        <input
                            type="email"
                            className="input input-bordered"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </label>

                    <label className="form-control">
            <span className="label">
              <span className="label-text">Mot de passe</span>
            </span>
                        <input
                            type="password"
                            className="input input-bordered"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </label>

                    <button className={`btn btn-primary mt-2 ${loading ? "btn-disabled" : ""}`}>
                        {loading ? "Connexion…" : "Se connecter"}
                    </button>
                </div>
            </form>
        </div>
    );
}
