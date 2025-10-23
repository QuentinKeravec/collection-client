import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import EditItemPage from "./pages/EditItemPage";
import FavoritesPage from './pages/FavoritesPage';
import ItemDetailPage from './pages/ItemDetailPage';
import ItemsPage from './pages/ItemsPage';
import LoginPage from './pages/LoginPage';
import NewItemPage from './pages/NewItemPage';
import RequireAuth from './components/RequireAuth';
import './index.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route element={<App />}>
                <Route index element={<Navigate to="/items" />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<RequireAuth />}>
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/new" element={<NewItemPage />} />
                    <Route path="/items/:id" element={<ItemDetailPage />} />
                    <Route path="/edit/:id" element={<EditItemPage />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
);
