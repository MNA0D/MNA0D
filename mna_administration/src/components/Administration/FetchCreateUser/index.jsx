import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchCreateUser = async () => {
    try {
        const token = Cookies.get('token');
        const sessionid = Cookies.get('sessionid');

        if (!token || !sessionid) throw new Error('Tokens are missing');

        const response = await axios.post(`${process.env.REACT_APP_API}/create-user`, {}, {
            headers: {
                'Authorization': `Bearer ${token},${sessionid}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching toast data:', error);
        throw error;
    }
};
