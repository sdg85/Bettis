import {
    BETS_START,
    BETS_FAIL,
    GET_BETS_SUCCESS,
    GET_USER_BETS_SUCCESS,
    ADD_USER_BET_SUCCESS,
    REMOVE_USER_BET_SUCCESS,
    CHANGE_USER_BET_SUCCESS,
    BET_START
} from "../actions/actionTypes";

const initialState = {
    allBets:[],
    userBets: [],
    loading: false,
    betLoading: null,
    error: null
}


const betsReducer = (state = initialState, action) => {
    switch (action.type) {
        case BETS_START:
        return {
            ...state,
            loading: true
        }
        case BET_START: 
        return {
            ...state,
            betLoading: action.bet
        }
        case GET_BETS_SUCCESS:
        return {
            ...state,
            allBets: action.bets,
            loading: false
        }
        case GET_USER_BETS_SUCCESS:
            return {
                ...state,
                userBets: state.userBets.concat(action.userBets),
                loading: false
            }
        case ADD_USER_BET_SUCCESS:
            return {
                ...state,
                userBets: state.userBets.concat(action.userBet),
                betLoading: null
            }
        case CHANGE_USER_BET_SUCCESS:
            return {
                ...state,
                userBets: state.userBets.filter(bet => bet.fixtureId !== action.userBet.fixtureId).concat(action.userBet),
                betLoading: null
            }
        case REMOVE_USER_BET_SUCCESS:
            return {
                ...state,
                userBets: state.userBets.filter(bet => bet.betId !== action.betId),
                betLoading: null
            }
        case BETS_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false,
                betLoading: null
            }
        default: return state;
    }
};

export default betsReducer;