import axios from 'axios';
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export function setToken(token){
    if(token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete api.defaults.headers.common.Authorization;
}

export async function createItem(payload) {
    // payload: { title, type, year?, author?, description?, tags: string[] }
    const { data } = await api.post('/items', payload);
    return data;
}