import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from './actionTypes';
import Axios from 'axios';

export const authStart = () => {
    return {
        type: AUTH_START
    }
}

export const authFail = error => {
    return {
        type: AUTH_FAIL,
        error
    }
}

export const authSuccess = (tokenId, userId) => {
    return {
        type: AUTH_SUCCESS,
        tokenId,
        userId
    }
}

export const authLogout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

const logoutTimeOut = expirationTime => {
    return dispatch => {
        setTimeout( () => {
            dispatch(authLogout());
        },5000)
    }
}

export const auth = (email, password, signUp) => {
    return async dispatch => {
        dispatch(authStart());
        try{
            let response = null;
            if(signUp){
                response = await Axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + process.env.REACT_APP_FIREBASE_API, { email, password, returnSecureToken: true });
            }
            else{
                response = await Axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + process.env.REACT_APP_FIREBASE_API, { email, password, returnSecureToken: true });
            }
            
            const token = response.data.idToken;
            const userId = response.data.localId;
            dispatch(logoutTimeOut(response.data.expirationTime));
            dispatch(authSuccess(token, userId));
        }
        catch(error){
            let errorMessage = '';

            if(error){
                const errorObj = error.response.data.error;
                errorMessage = `ERROR: ${errorObj.message}`;
            }

            dispatch(authFail(errorMessage));
        }
    }
}
