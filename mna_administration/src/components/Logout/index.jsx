export const performLogout = (navigate) => {
    // Logique de déconnexion, par exemple, suppression du token d'authentification
    // localStorage.removeItem('token');

    // Redirection vers la page de connexion ou d'accueil
    navigate('/login'); // Changez '/login' par la route de votre choix
};