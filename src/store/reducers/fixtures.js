import { TODAYS_FIXTURES, BETTING, REMOVE_BET, CHANGE_BET } from '../actions/actionTypes';

const initialState = {
    fixtures: [],
    bets: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TODAYS_FIXTURES:
            return {
                ...state,
                fixtures: action.fixtures,
                bets: []
            }
        case BETTING:
            return {
                ...state,
                bets: state.bets.concat(action.bet)
            }
        case REMOVE_BET:
            return {
                ...state,
                bets: state.bets.filter(bet => bet.fixtureId !== action.fixtureId)
            }
        case CHANGE_BET:
            return {
                ...state,
                bets: state.bets
                    .filter(bet => bet.fixtureId !== action.bet.fixtureId)
                    .concat(action.bet)
            }
        default: return { state }
    }
}

export default reducer;