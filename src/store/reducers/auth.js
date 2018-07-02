import { AUTH_SUCCESS, AUTH_FAIL, AUTH_START } from '../actions/actionTypes';

const initalState = {
    tokenId: null,
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
            loading: false,
            error: null
        }
        case AUTH_FAIL:
        return {
            ...state,
            error: action.error,
            loading: false
        }
        default: return state
    }
}

export default reducer;