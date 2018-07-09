import { REMOVE_BET, GET_BETS, ADD_BET, CHANGE_BET, BET_FAIL } from './actionTypes';
import axios from 'axios';

export const getBets = bets => {
    return {
        type: GET_BETS,
        bets
    }
}

export const betFail = error => {
    return {
        type: BET_FAIL,
        error
    }
}
export const removeBet = fixtureId => {
    return {
        type: REMOVE_BET,
        fixtureId
    }
}

export const changeBet = bet => {
    return {
        type: CHANGE_BET,
        bet
    }
}

export const addBet = bet => {
    return {
        type: ADD_BET,
        bet
    }
}

export const initBets = () => {
    return {
        type: "INIT_BETS"
    }
}

export const saveNewBet = bet => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.tokenId;
            const betValues = Object.values(bet)[0];
            dispatch(addBet(betValues));
            await axios.patch("https://bettis-app.firebaseio.com/bets.json?auth=" + token, bet);
        }
        catch (error) {
            dispatch(betFail(error));
        }
    }

}
export const saveChangedBet = bet => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.tokenId;
            const betValues = Object.values(bet)[0];
            dispatch(changeBet(betValues));
            await axios.patch("https://bettis-app.firebaseio.com/bets.json?auth=" + token, bet);
        }
        catch (error) {
            dispatch(betFail(error));
        }
    }
}

export const deleteBet = fixtureId => {
    return async (dispatch, getState) => {
        dispatch(removeBet(fixtureId));
        try {
            const token = getState().auth.tokenId;
            await axios.delete("https://bettis-app.firebaseio.com/bets/" + fixtureId + ".json?auth=" + token);
        }
        catch (error) {
            dispatch(betFail(error));
        }

    }
}

export const fetchBets = () => {
    return async (dispatch, getState) => {
        try {
            const authReducer = getState().auth;
            const token = authReducer.tokenId;
            const userId = authReducer.userId;
            const betsData = await axios.get('https://bettis-app.firebaseio.com/bets.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"');
            const bets = betsData.data ? Object.values(betsData.data) : [];
            dispatch(getBets(bets));
        }
        catch (error) {
            dispatch(betFail(error));
        }
    }
}