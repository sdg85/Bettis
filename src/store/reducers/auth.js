import { AUTH_SUCCESS, AUTH_FAIL, AUTH_START, AUTH_LOGOUT } from '../actions/actionTypes';

const initalState = {
    tokenId: null,
    userId: null,
    loading: false,
    error: null
}

const reducer = (state = initalState, action) => {
    switch(action.type){
        case AUTH_START:
        return {
            ...state,
            loading: true
        }
        case AUTH_SUCCESS:
        return{
            ...state,
            tokenId: action.tokenId,
            userId: action.userId,
            loading: false,
            error: null
        }
        case AUTH_FAIL:
        return {
            ...state,
            error: action.error,
            loading: false
        }
        case AUTH_LOGOUT:
        return {
            ...state,
            userId: null,
            tokenId: null
        }
        default: return state
    }
}

export default reducer;