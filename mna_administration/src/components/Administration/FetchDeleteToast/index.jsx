import axios from 'axios';
import Cookies from 'js-cookie';

const FetchDeleteToast = async (toastId, setToastData) => {
    try {
        const token = Cookies.get('token');
        const sessionid = Cookies.get('sessionid');

        if (!token || !sessionid) throw new Error('Tokens are missing');

        await axios.delete(`${process.env.REACT_APP_API}/delete-toast`, {
            data: { toastId },
            headers: {
                'Authorization': `Bearer ${token},${sessionid}`
            }
        });

        // Remove the toast from local state
        setToastData(prevData => prevData.filter(toast => toast._id !== toastId));
    } catch (error) {
        console.error('Erreur lors de la suppression de la notification', error);
    }
};

export default FetchDeleteToast;
