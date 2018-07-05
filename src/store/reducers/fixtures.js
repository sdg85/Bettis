import { TODAYS_FIXTURES_SUCCESS, GET_FLAGS, TODAYS_FIXTURES_FAIL, TODAYS_FIXTURES_START } from '../actions/actionTypes';

const initialState = {
    fixtures: [],
    flags: [],
    error: null,
    loading: false
}

const fixtureReducer = (state = initialState, action) => {
    switch (action.type) {
        case TODAYS_FIXTURES_START:
        return {
            ...state,
            loading: true
        }
        case TODAYS_FIXTURES_SUCCESS:
            return {
                ...state,
                fixtures: action.fixtures,
                loading: false
            }
            case GET_FLAGS:
            return {
                ...state,
                flags: action.flags
            }
            case TODAYS_FIXTURES_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default: return state
    }
}

export default fixtureReducer;