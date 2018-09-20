import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import BetSpinner from '../../UI/Spinners/BetSpinner/BetSpinner';

const fixture = props => {
    const fixture = props.fixture;
    const matchDateTime = fixture ? moment(fixture.date).format("YYYY-MM-DD HH:mm") : "";

    let view = fixture ?
        <FixtureContainer date={matchDateTime}>
            <Header date={matchDateTime}>{matchDateTime}</Header>
            <TeamsContainer >
                <Team >
                    <Flag src={fixture.homeTeamFlagUrl} />
                    <TeamNameContainer >
                        <span>{fixture.homeTeamName}</span>
                    </TeamNameContainer>
                </Team>
                <VsContainer>
                    <div>
                        <h5>{fixture.status}</h5>
                    </div>
                    <Vs date={matchDateTime}>Vs</Vs>
                    {
                        dateTime() > matchDateTime ?
                            <div style={{ textAlign: "center" }}>
                                <h5>{`${fixture.goalHomeTeam} - ${fixture.goalAwayTeam}`}</h5>
                            </div>
                            : null
                    }
                </VsContainer>
                <Team >
                    <Flag src={fixture.awayTeamFlagUrl} />
                    <TeamNameContainer >
                        <span>{fixture.awayTeamName}</span>
                    </TeamNameContainer>
                </Team>
            </TeamsContainer>
            {
                props.loading ? <BetSpinner /> : 
                <BetContainer>
                    <Bet
                        id="HOME_TEAM"
                        date={matchDateTime}
                        onClick={() => matchDateTime > dateTime() ? props.clicked("HOME_TEAM", fixture.id, fixture.date) : null}
                        bet={props.bet} >1</Bet>
                    <Bet
                        id="DRAW"
                        date={matchDateTime}
                        onClick={() => matchDateTime > dateTime() ? props.clicked("DRAW", fixture.id, fixture.date) : null}
                        bet={props.bet} >X</Bet>
                    <Bet
                        id="AWAY_TEAM"
                        date={matchDateTime}
                        onClick={() => matchDateTime > dateTime() ? props.clicked("AWAY_TEAM", fixture.id, fixture.date) : null}
                        bet={props.bet} >2</Bet>
                </BetContainer>
            }
        </FixtureContainer> : null;

    return (
        view
    );
}

export default fixture;

const dateTime = () => moment(new Date()).format("YYYY-MM-DD HH:mm");

const FixtureContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${ props => props.date > dateTime() ? "#ffffff" : "#14141445"};
    padding: 20px;
    margin: 20px;
    opacity: 0.9;
    border: 2px solid #eee5c6;
    box-shadow: 0.055rem 0.055rem 1.112rem rgba(20,20,20,0.27);
`;

const Header = styled.div`
    background-color: ${ props => props.date > dateTime() ? "#cf0c1e" : "#14141445"};
    padding: 10px;
    color: #fff;
    text-align: center;
    font-weight: 700;
`;

const TeamsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px
`;

const Team = styled.div`
    display: flex;
    flex-direction: column;
`;

const Flag = styled.img`
        height: 100px;
        width: 100px;
`;

const TeamNameContainer = styled.div`
    text-align: center;
    max-width: 100px;
`;

const VsContainer = styled.div`
    justify-content: flex-start; 
    display: flex; 
    flex-direction: column;
    align-items: center;
`;

const Vs = styled.div`
    font-weight: 700;
    max-width: 20px;
    text-align: center; 
    color: #fff; 
    background-color: ${ props => props.date > dateTime() ? "#cf0c1e" : "#14141445"}; 
    border-radius: 100%; 
    padding: 10px
`;

const BetContainer = styled.div`
    display: flex;
    justify-content: space-around; 
    border: 1px solid #ccc; 
    margin-top: 10px;
`;

const Bet = styled.div`
    border: 1px solid #ccc; 
    flex: 1;
    text-align: center;
    padding: 3px;
    color: ${ props => {
        if (props.bet) {
            if (props.bet.bet === props.id)
                return "#fff";
        }
        return "#000";
    }};
    background-color: ${ props => {
        if (props.bet) {
            if (props.bet.bet === props.id)
                return props.date > dateTime() ? "#cf0c1e" : "#14141445";
        }
        return "";
    }};
`;