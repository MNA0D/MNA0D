import axios from 'axios';
import Cookies from 'js-cookie';

const FetchToastCreate = async (toastData) => {
    try {
        const token = Cookies.get('token');
        const sessionid = Cookies.get('sessionid');

        if (!token || !sessionid) throw new Error('Tokens are missing');

        await axios.post(`${process.env.REACT_APP_API}/create-toast`, toastData, {
            headers: {
                'Authorization': `Bearer ${token},${sessionid}`
            }
        });

        console.log('Notification envoyée avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de la notification', error);
    }
};

export default FetchToastCreate;
