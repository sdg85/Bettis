import { GET_USERS_SUCCESS, GET_USERS_FAIL, GET_USERS_START } from './actionTypes';
import axios from 'axios';

const getUsersSuccess = users => {
    return {
        type: GET_USERS_SUCCESS,
        users
    }
}

const getUsersFail = error => {
    return {
        type: GET_USERS_FAIL,
        error
    }
}

const getUsersStart = () => {
    return {
        type: GET_USERS_START
    }
}

export const fetchUsers = () => {
    return async (dispatch, getState) => {
        dispatch(getUsersStart());
        const token = getState().auth.tokenId;
        try{
            const response = await axios.get("https://bettis-app.firebaseio.com/users.json?auth=" + token);
            const users = Object.values(response.data);
            dispatch(getUsersSuccess(users));
        }
        catch(error){
            dispatch(getUsersFail(error));
        }
    }
}