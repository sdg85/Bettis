import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const fixture = props => {
    const fixture = props.fixture;

    let view = fixture ?
        <FixtureContainer>
            <Header>{`${moment(fixture.date).format("YYYY-MM-DD HH:mm")}`}</Header>
            <TeamsContainer >
                <Team >
                    <Flag src={fixture.homeTeamFlagUrl} />
                    <TeamNameContainer >
                        <span>{fixture.homeTeamName}</span>
                    </TeamNameContainer>
                </Team>
                <VsContainer>
                    <Vs>Vs</Vs>
                </VsContainer>
                <Team >
                    <Flag src={fixture.awayTeamFlagUrl} />
                    <TeamNameContainer >
                        <span>{fixture.awayTeamName}</span>
                    </TeamNameContainer>
                </Team>
            </TeamsContainer>
            <BetContainer>
                <Bet id="homeTeam" onClick={() => props.clicked("homeTeam", fixture.id)} bet={props.bet} >1</Bet>
                <Bet id="draw" onClick={() => props.clicked("draw", fixture.id)} bet={props.bet} style={{ border: "1px solid #ccc", flex: 1, textAlign: "center", padding: 3 }}>X</Bet>
                <Bet id="awayTeam" onClick={() => props.clicked("awayTeam", fixture.id)} bet={props.bet} style={{ border: "1px solid #ccc", flex: 1, textAlign: "center", padding: 3 }}>2</Bet>
            </BetContainer>
        </FixtureContainer> : "No Games today :(";
    return (
        view
    );
}

export default fixture;

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
    background-color: ${ props => {
        if(props.bet)
        {
            if(props.bet.bet === props.id)
                return "#cf0c1e";
        }
         
         return "";   
    } };
`;

const FixtureContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(20, 20, 20, 0.03);  
    padding: 20px;
    margin: 20px;
    opacity: 0.9;
    box-shadow: 0.05555555555555555rem 0.05555555555555555rem 1.1111111111111112rem rgba(20,20,20,0.27);
`;

const Header = styled.div`
    background-color: #cf0c1e;
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
        border-radius: 100%; 
        height: 80px;
        width: 80px;
        border: 1px solid #ccc;
`;

const VsContainer = styled.div`
    justify-content: center; 
    display: flex; 
    flex-direction: column;
`;

const TeamNameContainer = styled.div`
    text-align: center
`;

const Vs = styled.span`
    font-weight: 700; 
    color: #fff; 
    background-color: #cf0b1e; 
    border-radius: 100%; 
    padding: 10px
`;

/* const DateText = styled.h1`
    color: #000;
    margin: 10px;
`; */