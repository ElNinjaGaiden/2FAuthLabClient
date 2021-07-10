import axios from 'axios';
import User from '../../models/user';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

const getUsers = async () : Promise<User[]> => {
    try {
        const url = `/api/users`;
        const { data: { data } } = await axios({
            baseURL: API_BASE_URL,
            url,
            method: 'GET'
        });
        const users: User[] = data;
        return users;
    } catch (ex) {
        const errorMessage = ex.response && ex.response.data && ex.response.data.message ? ex.response.data.message : ex.message;
        throw new Error(errorMessage);
    }
};

export default getUsers;