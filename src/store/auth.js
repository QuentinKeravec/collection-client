import { create } from 'zustand';
import { api, setToken } from '../api';

export const useAuth = create((set)=>({
    token: localStorage.getItem('token'),
    user: null,
    async login(email, password){
        const {data} = await api.post('/login', {email,password});
        localStorage.setItem('token', data.token);
        setToken(data.token);
        set({token: data.token});
    },
    logout(){
        localStorage.removeItem('token');
        setToken(null);
        set({token:null,user:null});
    }
}));

// init header if token exists
setToken(localStorage.getItem('token'));
