import * as constants from '../constants';

export const fetchAllDatas = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/api/dcandidate',
        success: (respone) => (setAllDatas(respone))
    }
});

export const createData = (data, onSuccess,onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/api/dcandidate',
        data,
        success: (data) => (addData(data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getDataByid = (id, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/api/dcandidate/${id}`,
        postProcessSuccess: onSuccess
    }
});

export const updateDataById = (id, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `/api/dcandidate/${id}`,
        data,
        success: (id, data) => (updateData(id, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteDataById = (id, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/api/dcandidate/${id}`,
        success: () => (removeData(id)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const addData = (data) => ({
    type: constants.ADD_DATA,
    payload: data
});

const setAllDatas = (data) => ({
    type: constants.SET_ALL_DATAS,
    payload: data
});

const updateData = (id, data) => ({
    type: constants.UPDATE_DATA,
    payload: { id, data }
});

const removeData = (id) => ({
    type: constants.REMOVE_DATA,
    payload: id
});