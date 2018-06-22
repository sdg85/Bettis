import { REMOVE_BET, GET_BETS, ADD_BET, CHANGE_BET } from './actionTypes';
import axios from 'axios';

export const getBets = bets => {
    return {
        type: GET_BETS,
        bets
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
    return async dispatch => {
        try {
            const betValues = Object.values(bet)[0];
            dispatch(addBet(betValues));
            await axios.patch("https://bettis-app.firebaseio.com/bets.json", bet);
        }
        catch (e) {
            console.log(e);
        }
    }

}
export const saveChangedBet = bet => {
    return async dispatch => {
        try {
            const betValues = Object.values(bet)[0];
            dispatch(changeBet(betValues));
            await axios.patch("https://bettis-app.firebaseio.com/bets.json", bet);
        }
        catch (e) {
            console.log(e);
        }
    }
}

export const deleteBet = fixtureId => {
    return async dispatch => {
        dispatch(removeBet(fixtureId));
        try{
            await axios.delete("https://bettis-app.firebaseio.com/bets/" + fixtureId + ".json");
        }
        catch(e){
            console.log(e);
        }
        
    }
}

export const fetchBets = () => {
    return async dispatch => {
        const betsData = await axios.get("https://bettis-app.firebaseio.com/bets.json");
        const bets = betsData.data ? Object.values(betsData.data) : [];
        dispatch(getBets(bets));
    }
}