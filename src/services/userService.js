import * as httpRequest from '../utils/httpRequest';

export const getSuggested = async ({ page, perPage }) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                page,
                per_page: perPage,
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }

};

export const getFollowing = async ({ page, token }) => {
    try {
        const res = await httpRequest.get('me/followings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page,
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
    
};

export const getUser = async ({ userNickname, token }) => {
    try {
        const res = await httpRequest.get(`users/${userNickname}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
    
};

export const followUser = async ({ id, token }) => {
    try {
        const res = await httpRequest.post(`users/${id}/follow`, [], {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
    
};

export const unfollowUser = async ({ id, token }) => {
    try {
        const res = await httpRequest.post(`users/${id}/unfollow`, [], {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
    
};