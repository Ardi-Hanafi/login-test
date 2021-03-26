import * as constants from "../constants";

// Get All User
export const fetchAllUsers = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/users',
        success: (response) => (setAllUser(response))
    }
});

// Get User By Id
export const getUserById = (id, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/users/${id}`,
        postProcessSuccess: onSuccess
    }
});

// Update User By Id
export const updateUserById = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `/users/${id}`,
        data,
        success: (id, data) => (updateUser(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

// Delete User By Id
export const deleteUserById =(id, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/users/${id}`,
        success: () => (removeUser(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});



const setAllUser = (data) => ({
    type: constants.SET_ALL_USER,
    payload: data
});

const updateUser = (id, data) => ({
    type: constants.UPDATE_USER,
    payload: { id, data }
});

const removeUser = (id) => ({
    type: constants.REMOVE_USER,
    payload: id
});