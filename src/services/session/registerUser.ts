import axios from 'axios';
import User from '../../models/user';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

const registerUser = async (user: User) : Promise<User> => {
    try {
        const url = `/api/access/register`;
        const dataRequest = user;
        const { data: { data } } = await axios({
            baseURL: API_BASE_URL,
            url,
            method: 'POST',
            data: dataRequest
        });
        const newUser: User = data;
        return newUser;
    } catch (ex) {
        const errorMessage = ex.response && ex.response.data && ex.response.data.message ? ex.response.data.message : ex.message;
        throw new Error(errorMessage);
    }
};

export default registerUser;