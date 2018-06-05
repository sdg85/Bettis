import { TODAYS_FIXTURES } from '../actions/actionTypes';

const initialState =  {
    fixtures: []
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case TODAYS_FIXTURES:
        return {
            ...state,
            fixtures: action.fixtures
        }
        default: return { state }
    }
}

export default reducer;