import axios from 'axios';
import Cookies from 'js-cookie';

const deleteUser = async (userName, userData, setUserData, setSelectedUser) => {
    try {
        const token = Cookies.get('token');
        const sessionid = Cookies.get('sessionid');

        if (!token || !sessionid) throw new Error('Tokens are missing');

        await axios.delete(`${process.env.REACT_APP_API}/delete-user`, {
            data: { user: userName },
            headers: {
                'Authorization': `Bearer ${token},${sessionid}`
            }
        });
        setUserData(userData.filter(user => user.user !== userName));
        setSelectedUser(null); // Clear selected user after deletion
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
    }
};

export default deleteUser;
