import axios from 'axios';
import Language from '../../models/language';

const { REACT_APP_API_BASE_URL: API_BASE_URL } = process.env;

const getLanguages = async () : Promise<Language[]> => {
    try {
        const url = `/api/languages`;
        const { data: { data } } = await axios({
            baseURL: API_BASE_URL,
            url,
            method: 'GET'
        });
        const languages: Language[] = data;
        return languages;
    } catch (ex) {
        const errorMessage = ex.response && ex.response.data && ex.response.data.message ? ex.response.data.message : ex.message;
        throw new Error(errorMessage);
    }
};

export default getLanguages;