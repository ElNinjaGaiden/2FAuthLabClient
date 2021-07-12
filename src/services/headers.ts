import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function headers () {
    const { userId, jwt } = cookies.get('accessToken');
    return {
        'authorization': `Bearer ${jwt}`,
        'x-user-id': userId
    };
}

export default headers;