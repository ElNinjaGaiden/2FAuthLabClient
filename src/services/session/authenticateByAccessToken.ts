import axios from 'axios';
import User from '../../models/user';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

const authenticateByAccessToken = async (userId: string, accessToken: string) : Promise<{ success: boolean, user?: User }> => {
    try {
        const url = `/api/access/authenticateByToken`;
        const dataRequest = {
            userId,
            accessToken
        };
        const { data: { success, data } } = await axios({
            baseURL: API_BASE_URL,
            url,
            method: 'POST',
            data: dataRequest
        });;
        const response: { success: boolean, user?: User } = {
            success,
            user: success && data
        };
        return response;
    } catch (ex) {
        const errorMessage = ex.response && ex.response.data && ex.response.data.message ? ex.response.data.message : ex.message;
        throw new Error(errorMessage);
    }
};

export default authenticateByAccessToken;