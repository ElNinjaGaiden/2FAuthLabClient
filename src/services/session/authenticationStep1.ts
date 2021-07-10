import axios from 'axios';
import User from '../../models/user';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

const authenticationStep1 = async (userName: string, password: string) : Promise<User> => {
    try {
        const url = `/api/users/authenticate`;
        const dataRequest = {
            userName,
            password
        };
        const { data: { data } } = await axios({
            baseURL: API_BASE_URL,
            url,
            method: 'POST',
            data: dataRequest
        });
        const user: User = data;
        return user;
    } catch (ex) {
        const errorMessage = ex.response && ex.response.data && ex.response.data.message ? ex.response.data.message : ex.message;
        throw new Error(errorMessage);
    }
};

export default authenticationStep1;