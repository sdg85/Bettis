import { SCORE_START, SCORE_FAIL, SCORE_SUCCESS } from './actionTypes';
import moment from 'moment';
import axios from 'axios';

export const scoreStart = () => {
    return {
        type: SCORE_START
    }
}

export const scoreSuccess = scores => {
    return {
        type: SCORE_SUCCESS,
        scores
    }
}

export const scoreFail = error => {
    return {
        type: SCORE_FAIL,
        error
    }
}

export const getScores = () => {
    return async dispatch => {
        dispatch(scoreStart());

        const fromDate = moment(new Date("2018-06-14")).format("YYYY-MM-DD");
        const toDate = moment(new Date()).format("YYYY-MM-DD");

        try {
            const fixturesData = await axios.get("https://api.football-data.org/v2/competitions/2000/matches?dateFrom=" + fromDate + "&dateTo=" + toDate, headersConf);
            
            
            dispatch(scoreSuccess(fixturesData.data.matches));
        }
        catch(error){
            dispatch(scoreFail(error));
        }
        
    }
};

const headersConf = {
    headers: { "x-auth-token": process.env.REACT_APP_FOOTBALL_DATA_API }
}