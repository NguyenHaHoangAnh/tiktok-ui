import * as httpRequest from '../utils/httpRequest';

export const getUser = async ({ userNickname }) => {
    try {
        const res = await httpRequest.get(`users/${userNickname}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
    
};