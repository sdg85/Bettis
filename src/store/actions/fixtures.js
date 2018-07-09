import { TODAYS_FIXTURES_SUCCESS, TODAYS_FIXTURES_START, TODAYS_FIXTURES_FAIL, GET_FLAGS } from './actionTypes';
import axios from 'axios';
import moment from 'moment';

export const todaysFixturesStart = () => {
    return {
        type: TODAYS_FIXTURES_START
    }
}

export const todaysFixturesSuccess = fixtures => {
    return {
        type: TODAYS_FIXTURES_SUCCESS,
        fixtures
    }
}

export const todaysFixturesFail = error => {
    return {
        type: TODAYS_FIXTURES_FAIL,
        error
    }
}

export const getFlags = flags => {
    return {
        type: GET_FLAGS,
        flags
    }
}



export const fetchTodaysFixtures = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(todaysFixturesStart());
            //Get flags from state
            let flags = getState().fixturesReducer.flags;
            //Get flags for all teams if there not already fetched.
            if (flags.length === 0) {
                const flagsData = await axios.get("https://bettis-app.firebaseio.com/flags.json");
                flags = flagsData.data;
                dispatch(getFlags(flags));
            }
            
            const today = moment(new Date());
            const fromDate = today.format("YYYY-MM-DD");
            const toDate = today.add(2, 'days').format("YYYY-MM-DD");
            const fixturesData = await axios.get("http://api.football-data.org/v2/competitions/2000/matches?dateFrom=" + fromDate + "&dateTo=" + toDate, headersConf);

            const fixtures = fixturesData.data.matches.map(fixture => {
                const homeFlag = flags.find(flag => flag.teamName === fixture.homeTeam.name);
                const awayFlag = flags.find(flag => flag.teamName === fixture.awayTeam.name);

                return {
                    id: fixture.id,
                    status: fixture.status,
                    date: fixture.utcDate,
                    homeTeamName: fixture.homeTeam.name,
                    homeTeamFlagUrl: homeFlag ? homeFlag.flagUrl : "",
                    awayTeamName: fixture.awayTeam.name,
                    awayTeamFlagUrl: awayFlag ? awayFlag.flagUrl : "",
                    goalHomeTeam: fixture.score.halfTime.homeTeam || 0 + fixture.score.fullTime.homeTeam || 0 + fixture.score.extraTime.homeTeam || 0,
                    goalAwayTeam: fixture.score.halfTime.awayTeam || 0 + fixture.score.fullTime.awayTeam || 0 + fixture.score.extraTime.awayTeam || 0,
                    penaltiesHomeTeam: fixture.score.penalties.homeTeam, 
                    penaltiesAwayTeam: fixture.score.penalties.awayTeam, 
                    winner: fixture.winner
                }
            });
            dispatch(todaysFixturesSuccess(fixtures));
        }
        catch (error) {
            dispatch(todaysFixturesFail(error));
        }
    }
}

const headersConf = {
    headers: { "x-auth-token": process.env.REACT_APP_FOOTBALL_DATA_API }
}