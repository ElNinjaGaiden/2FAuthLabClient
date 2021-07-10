import axios from 'axios';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

const verifySecret = async (userId: string, token: string) : Promise<boolean> => {
    try {
        const url = `/api/users/verify`;
        const dataRequest = {
            userId,
            token
        };
        const { data: { success } } = await axios({
            baseURL: API_BASE_URL,
            url,
            method: 'POST',
            data: dataRequest
        });
        return success;
    } catch (ex) {
        const errorMessage = ex.response && ex.response.data && ex.response.data.message ? ex.response.data.message : ex.message;
        throw new Error(errorMessage);
    }
};

export default verifySecret;