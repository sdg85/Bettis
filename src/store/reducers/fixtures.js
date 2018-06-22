import { TODAYS_FIXTURES, GET_FLAGS } from '../actions/actionTypes';

const initialState = {
    fixtures: [],
    flags: []
}

const fixtureReducer = (state = initialState, action) => {
    switch (action.type) {
        case TODAYS_FIXTURES:
            return {
                ...state,
                fixtures: action.fixtures
            }
            case GET_FLAGS:
            return {
                ...state,
                flags: action.flags
            }
        default: return state
    }
}

export default fixtureReducer;