import { TODAYS_FIXTURES, GET_FLAGS } from './actionTypes';
import axios from 'axios';
import moment from 'moment';

export const getFixtures = fixtures => {
    return {
        type: TODAYS_FIXTURES,
        fixtures
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
            //Get flags from state
            let flags = getState().flags;

            //Get flags for all teams if there not already fetched.
            if (!flags) {
                const flagsData = await axios.get("https://bettis-app.firebaseio.com/flags.json");
                flags = flagsData.data;
                dispatch(getFlags(flags));
            }
            const res = await axios.get("https://api.sportdeer.com/v1/accessToken/?refresh_token=" + refreshToken);
            const today = moment(new Date());
            const fromDate = today.format("YYYY-MM-DD");
            const toDate = today.add(1, 'days').format("YYYY-MM-DD");
            const fixturesData = await axios.get("https://api.sportdeer.com/v1/fixtures?dateFrom=" + fromDate + "&dateTo=" + toDate + "&access_token=" + res.data.new_access_token);

            const fixtures = fixturesData.data.docs.map(fixture => {
                const homeFlag = flags.find(flag => flag.teamName === fixture.team_season_home_name);
                const awayFlag = flags.find(flag => flag.teamName === fixture.team_season_away_name);

                return {
                    id: fixture._id,
                    status: fixture.fixture_status,
                    matchDay: fixture.round,
                    date: fixture.schedule_date,
                    homeTeamName: fixture.team_season_home_name,
                    homeTeamFlagUrl: homeFlag ? homeFlag.flagUrl : "",
                    awayTeamName: fixture.team_season_away_name,
                    awayTeamFlagUrl: awayFlag ? awayFlag.flagUrl : "",
                    goalHomeTeam: fixture.number_goal_team_home,
                    goalAwayTeam: fixture.number_goal_team_away
                }
            });
            dispatch(getFixtures(fixtures));
        }
        catch (e) {
            console.log(e);
        }
    }
}

const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjBlNzBlZTQ2MjNjNDU3ZjBjMDA4ZGUiLCJpYXQiOjE1MjkyNjIyNDB9.eIZRZ6mZPOl5FXjZL4KJYGVStwTgFTB6iA-t7oJBpTY";
// const headersConf = {
//     headers: { "x-auth-token": "b87d814a97c0435481e58344ccd40340" }
// }