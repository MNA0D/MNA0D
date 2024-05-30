import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchToastData = async () => {
    try {
        const token = Cookies.get('token');
        const sessionid = Cookies.get('sessionid');

        if (!token || !sessionid) {
            throw new Error('Tokens are missing');
        }

        const response = await axios.get(`${process.env.REACT_APP_API}/toast`, {
            headers: {
                'Authorization': `Bearer ${token},${sessionid}`
            }
        });

        return response.data.toasts;
    } catch (error) {
        console.error('Error fetching toast data:', error);
        throw error;
    }
};
