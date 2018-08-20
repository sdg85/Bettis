import { GET_USERS_SUCCESS, GET_USERS_START, GET_USERS_FAIL } from '../actions/actionTypes';

const initState = {
    users: [],
    loading: false,
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case GET_USERS_SUCCESS:
        return {
            ...state,
            users: action.users,
            loading: false
        }
        case GET_USERS_START:
        return {
            ...state,
            loading: true
        }
        case GET_USERS_FAIL:
        return {
            ...state,
            loading: false,
            error: action.error
        }
        default: return state
    }
}

export default reducer;