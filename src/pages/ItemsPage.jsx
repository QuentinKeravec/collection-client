import { useEffect, useState } from 'react';
import { api } from '../api';
import { useAuth } from '../store/auth';

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

    const toggleFavorite = async (id, favored) => {
        if(!token) return alert('Connecte-toi');
        if(!favored) await api.post(`/items/${id}/favorite`);
        else await api.delete(`/items/${id}/favorite`);
        // pas idéal mais rapide: recharger la page de favoris seulement
    };

    if(!data) return <p>Chargement…</p>;

    return (
        <div>
            <h1>Collection</h1>
            <Filters params={params} onChange={setParams} />
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {data.data.map(it=>(
                    <li key={it.id} className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h3 className="card-title">{it.title}</h3>
                            <p className="opacity-70">{it.type}{it.year ? ` · ${it.year}` : ''}</p>
                            {it.tags?.length ? <div className="flex gap-2 flex-wrap">
                                {it.tags.map(tag => <span key={tag} className="badge badge-outline">{tag}</span>)}
                            </div> : null}
                            <div className="card-actions justify-end">
                                <button className="btn btn-outline">❤️ Favori</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <Pager meta={data.meta} onPage={p=>setParams(s=>({...s,page:p}))}/>
        </div>
    );
}

function Filters({params,onChange}){
    return (
        <div className="grid gap-3 md:grid-cols-4">
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
