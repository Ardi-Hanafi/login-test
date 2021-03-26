import * as constants from '../constants';

export const registerUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/users/register',
        data,
        // success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const loginUser = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/users/authenticate',
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getUserByid = (id, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/users/${id}`,
        postProcessSuccess: onSuccess
    }
});

export const updateUserById = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `/users/${id}`,
        data,
        success: (response) => (setUserInfo(response)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const logoutUser = () => {
    localStorage.removeItem('USER_INFO');
    return { type: constants.RESET_USER_INFO };
};

const setUserInfo = (data) => {
    const parsedToken = () => {
        return JSON.parse(atob(data.token.split(".")[1]))
    };
    const userInfo = {
        userId: data.id,
        username: data.username, 
        fullName: `${data.firstName} ${data.lastName}`,
        role: data.role,
        token: data.token,
        isLoggendIn: true
    };
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
    return { type: constants.SET_USER_INFO, payload: userInfo };
};

