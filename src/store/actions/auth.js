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

//logout user when time expires
const logoutTimeOut = expirationTime => {
    return dispatch => {
        setTimeout( () => {
            dispatch(authLogout());
        },expirationTime * 1000)
    }
}

export const auth = (firstname, lastname, email, password, imgUrl, signUp) => {
    return async dispatch => {
        dispatch(authStart());
        try{
            let response = null;

            if(signUp){
                response = await Axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + process.env.REACT_APP_FIREBASE_API, { email, password, returnSecureToken: true });
                const user = { [response.data.localId]: { username: response.data.email, firstname, lastname, imgUrl: imgUrl, userId: response.data.localId }};
                await Axios.patch("https://bettis-app.firebaseio.com/users.json?auth=" + response.data.idToken, user);
            }
            else{
                response = await Axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + process.env.REACT_APP_FIREBASE_API, { email, password, returnSecureToken: true });
            }
            
            const token = response.data.idToken;
            const userId = response.data.localId;
            dispatch(logoutTimeOut(response.data.expiresIn));
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
