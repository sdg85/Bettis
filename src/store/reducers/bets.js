import { GET_BETS, REMOVE_BET, ADD_BET, CHANGE_BET, BET_FAIL } from "../actions/actionTypes";

const initialState = {
    bets: [],
    loading: false,
    error: null
}


const betsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BETS:
            return {
                ...state,
                bets: state.bets.concat(action.bets) 
            }
            case ADD_BET:
            return {
                ...state,
                bets: state.bets.concat(action.bet)
            }
            case CHANGE_BET:
            return {
                ...state,
                bets: state.bets.filter(bet => bet.fixtureId !== action.bet.fixtureId).concat(action.bet)
            }
            case REMOVE_BET:
            return {
                ...state,
                bets: state.bets.filter(bet => bet.fixtureId !== action.fixtureId)
            }
            case BET_FAIL:
            return {
                ...state,
                error: action.error
            }
        default: return state;
    }
};

export default betsReducer;