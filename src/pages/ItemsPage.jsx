import { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../store/auth';
import { Link } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";

export default function ItemsPage(){
    const [data,setData] = useState(null);
    const [params, setParams] = useState({ page:1, type:'', tag:'', search:'' });
    const { token } = useAuth();

    useEffect(()=>{
        const qs = new URLSearchParams(Object.fromEntries(
            Object.entries(params).filter(([_,v])=>v!=='' && v!=null)
        )).toString();
        api.get(`/items?${qs}`).then(res=>setData(res.data));
    }, [params]);

    const placeholder = "/no-image.jpg";

    if(!data) return <span className="loading loading-bars loading-xl"></span>;

    return (
        <div>
            <h1>Collection</h1>
            <Filters params={params} onChange={setParams} />
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {data.data.map((it) => (
                    <Link key={it.id} to={`/items/${it.id}`} className="card bg-base-100 shadow hover:shadow-lg transition">

                        <figure>
                            <img
                                src={it.image_url || placeholder}
                                alt={it.title}
                                className="w-full object-cover h-32"
                            />
                        </figure>

                        <div className="card-body">
                            <h2 className="card-title">{it.title}</h2>
                            <p>{it.description}</p>
                            <div className="card-actions justify-end">
                                <FavoriteButton itemId={it.id} initial={it.is_favorite} />
                            </div>
                        </div>
                    </Link>
                ))}
            </ul>
            <Pager meta={data.meta} onPage={p=>setParams(s=>({...s,page:p}))}/>
        </div>
    );
}

function Filters({params,onChange}){
    return (
        <div className="grid gap-3 md:grid-cols-4 mb-4">
            <select className="select select-bordered" value={params.type}
                    onChange={e=>onChange(s=>({...s,type:e.target.value,page:1}))}>
                <option value="">Type (tous)</option>
                {['movie','book','game','manga','anime','music'].map(t=>(
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>
            <input className="input input-bordered" placeholder="Tag (exact)" value={params.tag}
                   onChange={e=>onChange(s=>({...s,tag:e.target.value,page:1}))}/>
            <input className="input input-bordered" placeholder="Recherche…" value={params.search}
                   onChange={e=>onChange(s=>({...s,search:e.target.value,page:1}))}/>
            <select className="select select-bordered" onChange={e=>{
                const [sort,dir]=e.target.value.split(':'); onChange(s=>({...s,sort,dir,page:1}))
            }}>
                <option value="created_at:desc">Tri: récents</option>
                <option value="title:asc">Titre A→Z</option>
                <option value="year:desc">Année ↓</option>
                <option value="year:asc">Année ↑</option>
            </select>
        </div>
    );
}

function Pager({meta,onPage}){
    const {current_page,last_page} = meta;
    return (
        <div style={{marginTop:12}}>
            <button disabled={current_page<=1} onClick={()=>onPage(current_page-1)}>Précédent</button>
            <span style={{margin:'0 8px'}}>{current_page} / {last_page}</span>
            <button disabled={current_page>=last_page} onClick={()=>onPage(current_page+1)}>Suivant</button>
        </div>
    );
}
