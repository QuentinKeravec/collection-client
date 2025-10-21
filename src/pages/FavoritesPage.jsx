import { useEffect, useState } from 'react';
import { api } from '../api';

export default function FavoritesPage(){
    const [data,setData] = useState(null);
    useEffect(()=>{ api.get('/me/favorites').then(res=>setData(res.data)); }, []);
    if(!data) return <p>Chargement…</p>;
    return (
        <div>
            <h1>Mes favoris</h1>
            <ul>
                {data.data.map(it=> <li key={it.id}>{it.title} — {it.type}</li>)}
            </ul>
        </div>
    );
}
