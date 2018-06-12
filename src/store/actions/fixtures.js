import { TODAYS_FIXTURES, BETTING, REMOVE_BET, CHANGE_BET } from './actionTypes';
import axios from 'axios';

export const getTodaysFixtures = fixtures => {
    return {
        type: TODAYS_FIXTURES,
        fixtures
    }
}

export const onBet = bet => {
    return {
        type: BETTING,
        bet
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

export const fetchTodaysFixtures = () => {
    return async dispatch => {
        try {
            // const res = await axios.get("http://api.football-data.org/v1/competitions/467/fixtures?timeFrame=n12", headersConf);
            const res = await axios.get("https://api.sportdeer.com/v1/accessToken/?refresh_token=" + refreshToken);
            const fixturesData = await axios.get("https://api.sportdeer.com/v1/fixtures?dateFrom=2018-06-14&dateTo=2018-06-20&access_token=" + res.data.new_access_token);

            const fixtures = fixturesData.data.docs.map(fixture => {
                return {
                    id: fixture._id,
                    matchDay: fixture.round,
                    date: fixture.schedule_date,
                    homeTeamName: fixture.team_season_home_name,
                    awayTeamName: fixture.team_season_away_name,
                    goalHomeTeam: fixture.number_goal_team_home,
                    goalAwayTeam: fixture.number_goal_team_away
                }
            });

            // const fixtures = await Promise.all(res.data.fixtures.map(async fixture => {

            //     //Get the teams flag
            //     const homeTeamData = await axios.get(fixture._links.homeTeam.href, headersConf);
            //     const awayTeamData = await axios.get(fixture._links.awayTeam.href, headersConf);
            //     const homeTeamFlagUrl = homeTeamData.data.crestUrl;
            //     const awayTeamFlagUrl = awayTeamData.data.crestUrl;
                
            //    return {
            //         fixtureId: fixture._links.self.href.split('/').pop(),
            //         date: fixture.date,
            //         homeTeamName: fixture.homeTeamName,
            //         awayTeamName: fixture.awayTeamName,
            //         matchday: fixture.matchday,
            //         goalHomeTeam: fixture.result.goalHomeTeam,
            //         goalAwayTeam: fixture.result.goalAwayTeamName,
            //         status: fixture.status,
            //         homeTeamFlagUrl: homeTeamFlagUrl,
            //         awayTeamFlagUrl: awayTeamFlagUrl
            //     }
            // }));

            dispatch(getTodaysFixtures(fixtures));
        }
        catch (e) {
            console.log(e);
        }


    //    const data = {
    //         awayTeamName: "Saudi Arabia",
    //         date: "2018-06-14T15:00:00Z",
    //         homeTeamName: "Russia",
    //         matchday: 1,
    //         odds: null,
    //         result: {
    //             goalsHomeTeam: null,
    //                 goalsAwayTeam: null
    //         },
    //         status: "TIMED",
                // links: {
                //     awayTeam: { href: "http://api.football-data.org/v1/teams/801" },
                //     competition: { href: "http://api.football-data.org/v1/competitions/467" },
                //     homeTeam: { href: "http://api.football-data.org/v1/teams/808" },
                //     self: { href: "http://api.football-data.org/v1/fixtures/165069" }
                // }
    //     }

        // const fixtures = fixturesData.data.docs.map(fixture => {
        //     return {
        //         id: fixture._id,
        //         matchDay: fixture.round,
        //         date: fixture.schedule_date,
        //         homeTeam: fixture.team_season_home_name,
        //         awayTeam: fixture.team_season_away_name,
        //         goalHomeTeam: fixture.number_goal_team_home,
        //         goalAwayTeam: fixture.number_goal_team_away
        //     }
        // });

        // dispatch(getTodaysFixtures(fixtures));
    }
}

const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjBlNzBlZTQ2MjNjNDU3ZjBjMDA4ZGUiLCJpYXQiOjE1Mjc4NDc2OTh9.yR6SdpJsk3NNKqt3Yg5kmf2GCmNlH-rxTDHNlsBnEMA";
// const headersConf = {
//     headers: { "x-auth-token": "b87d814a97c0435481e58344ccd40340" }
// }