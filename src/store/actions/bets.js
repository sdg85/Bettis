import {
    BET_START,
    BETS_START,
    BETS_FAIL,
    GET_BETS_SUCCESS,
    GET_USER_BETS_SUCCESS,
    ADD_USER_BET_SUCCESS,
    REMOVE_USER_BET_SUCCESS,
    CHANGE_USER_BET_SUCCESS,
} from './actionTypes';
import axios from 'axios';

export const betsStart = () => {
    return {
        type: BETS_START
    }
}

export const betStart = bet => {
    return {
        type: BET_START,
        bet
    }
}

export const getUserBetsSuccess = userBets => {
    return {
        type: GET_USER_BETS_SUCCESS,
        userBets
    }
}

export const getBetsSuccess = bets => {
    return {
        type: GET_BETS_SUCCESS,
        bets
    }
}

export const betsFail = error => {
    return {
        type: BETS_FAIL,
        error
    }
}
export const removeUserBetSuccess = betId => {
    return {
        type: REMOVE_USER_BET_SUCCESS,
        betId
    }
}

export const changeUserBetSuccess = userBet => {
    return {
        type: CHANGE_USER_BET_SUCCESS,
        userBet
    }
}

export const addUserBetSuccess = userBet => {
    return {
        type: ADD_USER_BET_SUCCESS,
        userBet
    }
}

export const saveNewUserBet = userBet => {
    return async (dispatch, getState) => {
        try {
            //error:"Invalid data; couldn't parse JSON object. Are you sending a JSON object with valid key names?"
            const token = getState().auth.tokenId;
            const betValues = Object.values(userBet)[0];
            dispatch(betStart(betValues));
            await axios.patch("https://bettis-app.firebaseio.com/bets.json?auth=" + token, userBet);
            dispatch(addUserBetSuccess(betValues));
        }
        catch (error) {
            dispatch(betsFail(error));
        }
    }

}
export const saveChangedUserBet = bet => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.tokenId;
            const betValues = Object.values(bet)[0];
            dispatch(betStart(betValues));
            await axios.patch("https://bettis-app.firebaseio.com/bets.json?auth=" + token, bet);
            dispatch(changeUserBetSuccess(betValues));
        }
        catch (error) {
            dispatch(betsFail(error));
        }
    }
}

export const deleteUserBet = (userBet) => {
    return async (dispatch, getState) => {
        try {
            dispatch(betStart(userBet));
            const token = getState().auth.tokenId;
            await axios.delete("https://bettis-app.firebaseio.com/bets/" + userBet.betId + ".json?auth=" + token);
            dispatch(removeUserBetSuccess(userBet.betId));
        }
        catch (error) {
            dispatch(betsFail(error));
        }

    }
}

export const fetchAllBets = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(betsStart());
            const token = getState().auth.tokenId;
            const response = await axios.get('https://bettis-app.firebaseio.com/bets.json?auth=' + token);
            const allBets = Object.values(response.data);

            // const betsArray = [];

            // for (let key in bets) {
            //     betsArray.push({
            //         betId: key,
            //         bet: bets[key].bet,
            //         fixtureId: bets[key].fixtureId,
            //         userId: bets[key].userId
            //     });
            // }
            dispatch(getBetsSuccess(allBets));
        }
        catch (error) {
            dispatch(betsFail(error.response.data.message));
        }
    }
}

export const fetchUserBets = () => {
    return async (dispatch, getState) => {
        try {
            const authReducer = getState().auth;
            const token = authReducer.tokenId;
            const userId = authReducer.userId;

            dispatch(betsStart());
            const response = await axios.get('https://bettis-app.firebaseio.com/bets.json?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"');
            const userBets = Object.values(response.data);

            dispatch(getUserBetsSuccess(userBets));
        }
        catch (error) {
            dispatch(betsFail(error));
        }
    }
}