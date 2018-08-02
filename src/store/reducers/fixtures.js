import { TODAYS_FIXTURES_SUCCESS, GET_FLAGS, TODAYS_FIXTURES_FAIL, TODAYS_FIXTURES_START, GET_ALL_FIXTURES_START, GET_ALL_FIXTURES_SUCCESS, GET_ALL_FIXTURES_FAIL } from '../actions/actionTypes';

const initialState = {
    todaysFixtures: [],
    allFixtures: [],
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
                todaysFixtures: action.fixtures,
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
            case GET_ALL_FIXTURES_START:
            return {
                ...state,
                loading: true
            }
            case GET_ALL_FIXTURES_SUCCESS:
            return {
                ...state,
                allFixtures: action.fixtures,
                loading: false
            }
            case GET_ALL_FIXTURES_FAIL:
            return {
                loading: false,
                error: action.error,
            }
        default: return state
    }
}

export default fixtureReducer;