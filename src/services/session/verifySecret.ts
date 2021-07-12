import axios from 'axios';
import AccessToken from '../../models/accessToken';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

const verifySecret = async (userId: string, token: string) : Promise<{ success: boolean, accessToken?: AccessToken }> => {
    try {
        const url = `/api/access/verify`;
        const dataRequest = {
            userId,
            token
        };
        const { data: { success, accessToken } } = await axios({
            baseURL: API_BASE_URL,
            url,
            method: 'POST',
            data: dataRequest
        });
        const response: { success: boolean, accessToken?: AccessToken } = {
            success,
            accessToken: success && { jwt: accessToken.jwt, expirationDate: new Date(accessToken.expirationDate) }
        };
        return response;
    } catch (ex) {
        const errorMessage = ex.response && ex.response.data && ex.response.data.message ? ex.response.data.message : ex.message;
        throw new Error(errorMessage);
    }
};

export default verifySecret;