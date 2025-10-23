import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        console.log('[Axios] error', error?.response?.status, error?.response?.data);
        return Promise.reject(error);
    }
);

export function setToken(token){
    if(token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete api.defaults.headers.common.Authorization;
}

export async function createItem(payload) {
    // payload: { title, type, year?, author?, description?, tags: string[] }
    const { data } = await api.post('/items', payload);
    return data;
}

export async function getItem(id) {
    const { data } = await api.get(`/items/${id}`);
    return data.data;
}

export async function updateItem(id, payload) {
    const { data } = await api.post(`/items/${id}`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
}

export async function deleteItem(id) {
    await api.delete(`/items/${id}`);
}