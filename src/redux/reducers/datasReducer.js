import * as constants from '../constants';

export default function datasReducer(state = [], action) {
    switch(action.type) {
        case constants.SET_ALL_DATAS:
            return action.payload;
        case constants.ADD_DATA:
            return state.concat(action.payload);
        case constants.REMOVE_DATA:
            return state.filter(item => item.id !== action.payload);
        case constants.UPDATE_DATA:
            return state.map(item => {
                // ID DATA MANAGEMENT
                if(item.id === action.payload.id)
                    return {...item, ...action.payload.data};
                else
                    return item;
            });
        case constants.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}