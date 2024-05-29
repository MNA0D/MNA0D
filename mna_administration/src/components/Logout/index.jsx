import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const performLogout = (navigate) => {
    // Supprimer le token
    Cookies.remove('token');

    // Redirection vers la page de connexion
    navigate('/login');
};
