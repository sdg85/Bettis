import { TODAYS_FIXTURES } from './actionTypes';
import axios from 'axios';

export const getTodaysFixtures = fixtures => {    
    return {
        type: TODAYS_FIXTURES,
        fixtures
    }
}

export const fetchTodaysFixtures = () => {
    return async dispatch => {
        const res = await axios.get("https://api.sportdeer.com/v1/accessToken/?refresh_token=" + refreshToken);
        const fixturesData = await axios.get("https://api.sportdeer.com/v1/fixtures?dateFrom=2018-06-14&dateTo=2018-06-15&access_token=" + res.data.new_access_token);

        const fixtures = fixturesData.data.docs.map(fixture => {
            return {
                id: fixture._id,
                matchDay: fixture.round,
                date: fixture.schedule_date,
                homeTeam: fixture.team_season_home_name,
                awayTeam: fixture.team_season_away_name,
                goalHomeTeam: fixture.number_goal_team_home,
                goalAwayTeam: fixture.number_goal_team_away
            }
        });

        dispatch(getTodaysFixtures(fixtures));
    }
}

const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjBlNzBlZTQ2MjNjNDU3ZjBjMDA4ZGUiLCJpYXQiOjE1Mjc4NDc2OTh9.yR6SdpJsk3NNKqt3Yg5kmf2GCmNlH-rxTDHNlsBnEMA";