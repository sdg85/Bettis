import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from './actionTypes';
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

export const authSuccess = tokenId => {
    return {
        type: AUTH_SUCCESS,
        tokenId
    }
}

export const auth = (email, password, signUp) => {
    return async dispatch => {
        dispatch(authStart());
        try{
            console.log(email, password);
            let response = null;
            if(signUp){
                console.log(signUp, "signing up!");
                response = await Axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=", { email, password, returnSecureToken: true });
            }
            else{
                console.log(signUp, "signing in!");
                response = await Axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=", { email, password, returnSecureToken: true });
            }
            
            const token = response.data.idToken;
            console.log(token);
            dispatch(authSuccess(token));
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
