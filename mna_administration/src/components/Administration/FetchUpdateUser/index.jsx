import axios from 'axios';
import Cookies from 'js-cookie';

const updateUser = async (userId, updatedData, setUserData) => {
    try {
        const token = Cookies.get('token');
        const sessionid = Cookies.get('sessionid');

        if (!token || !sessionid) throw new Error('Tokens are missing');

        await axios.put(`${process.env.REACT_APP_API}/update-user`, {
            userId: userId,
            newUserDetails: updatedData
        }, {
            headers: {
                'Authorization': `Bearer ${token},${sessionid}`
            }
        });

        // Update the user data locally
        setUserData(prevData => prevData.map(user => user._id === userId ? { ...user, ...updatedData } : user));
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    }
};

export default updateUser;
