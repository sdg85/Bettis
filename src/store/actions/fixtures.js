import {
    TODAYS_FIXTURES_SUCCESS,
    TODAYS_FIXTURES_START,
    TODAYS_FIXTURES_FAIL,
    GET_FLAGS,
    GET_ALL_FIXTURES_START,
    GET_ALL_FIXTURES_SUCCESS,
    GET_ALL_FIXTURES_FAIL
} from './actionTypes';

import axios from 'axios';
import moment from 'moment';


export const getAllFixturesStart = () => {
    return {
        type: GET_ALL_FIXTURES_START
    }
}

export const getAllFixturesSuccess = fixtures => {
    return {
        type: GET_ALL_FIXTURES_SUCCESS,
        fixtures
    }
}

export const getAllFixturesFail = error => {
    return {
        type: GET_ALL_FIXTURES_FAIL,
        error
    }
}

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

export const fetchAllFixtures = () => {
    return async (dispatch, getState) => {

        try {
            //fetch started, show spinner
            dispatch(getAllFixturesStart());

            const fromDate = moment(new Date("2018-09-18")).format("YYYY-MM-DD");
            const toDate = moment(new Date("2019-06-01")).format("YYYY-MM-DD");
            let allFixtures = getState().fixturesReducer.allFixtures;
            
            if (allFixtures.length === 0) {
                const response = await axios.get("https://api.football-data.org/v2/competitions/2001/matches?dateFrom=" + fromDate + "&dateTo=" + toDate, headersConf);

                //Get flags from state
                let flags = getState().fixturesReducer.flags;
                //Get flags for all teams if there not already fetched.
                if (flags.length === 0) {
                    const response = await axios.get("https://api.football-data.org/v2/competitions/2001/teams?year=2018&stage=GROUP_STAGE", headersConf);
                    flags = response.data.teams.map(team => { 
                        return {
                            teamName: team.name, 
                            flagUrl: team.crestUrl, 
                            shortName: team.shortName
                        } 
                    });
                    dispatch(getFlags(flags));
                }
                allFixtures = response.data.matches.map(fixture => {
                    const homeTeamFlag = flags.find(flag => flag.teamName === fixture.homeTeam.name);
                    const awayTeamFlag = flags.find(flag => flag.teamName === fixture.awayTeam.name);
                    console.log(fixture.status, fixture);
                    return {
                        id: fixture.id,
                        status: fixture.status,
                        // date: fixture.utcDate,
                        date: fixture.utcDate,
                        homeTeamName: fixture.homeTeam.name,
                        homeTeamFlagUrl: homeTeamFlag ? homeTeamFlag.flagUrl : "",
                        awayTeamName: fixture.awayTeam.name,
                        awayTeamFlagUrl: awayTeamFlag ? awayTeamFlag.flagUrl : "",
                        goalHomeTeam: fixture.score.fullTime.homeTeam || fixture.score.halfTime.homeTeam + fixture.score.extraTime.homeTeam || 0,
                        goalAwayTeam: fixture.score.fullTime.awayTeam || fixture.score.halfTime.awayTeam + fixture.score.extraTime.awayTeam || 0,
                        penaltiesHomeTeam: fixture.score.penalties.homeTeam,
                        penaltiesAwayTeam: fixture.score.penalties.awayTeam,
                        winner: fixture.score.winner
                    }
                });
            }
            dispatch(getAllFixturesSuccess(allFixtures));
        }
        catch (error) {
            dispatch(getAllFixturesFail(error));
        }

    }
}

export const fetchTodaysFixtures = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(todaysFixturesStart());

            const today = moment(new Date());
            const fromDate = today.format("YYYY-MM-DD");
            let toDate = today.add(2, 'days').format("YYYY-MM-DD");
            const finalDay = moment(new Date("2019-06-01")).format("YYYY-MM-DD");
            let todaysFixtures = [];
            let counter = 0;

            //Check each day for fixtures, if no fixtures found then move to the next day. 
            //The loop stops when it finds fixtures.
            while (todaysFixtures.length === 0 && toDate <= finalDay) {
                counter++;
                todaysFixtures = getState().fixturesReducer.allFixtures.filter(fixture => fixture.date >= fromDate && fixture.date <= toDate);
                toDate = moment(new Date(toDate)).add(counter, 'days').format("YYYY-MM-DD");
            }

            dispatch(todaysFixturesSuccess(todaysFixtures));
        }
        catch (error) {
            dispatch(todaysFixturesFail(error));
        }
    }
}

const headersConf = {
    headers: { "x-auth-token": process.env.REACT_APP_FOOTBALL_DATA_API }
}