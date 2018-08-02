import { SCORE_START, SCORE_SUCCESS, SCORE_FAIL } from '../actions/actionTypes';

const initialState = {
    scores: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SCORE_START:
        return {
            ...state,
            loading: true
        }
        case SCORE_SUCCESS:
        return {
            ...state,
            scores: action.scores,
            loading: false
        }
        case SCORE_FAIL:
        return {
            ...state,
            loading: false,
            error: action.error
        }
        default: return state
    }
}

export default reducer;