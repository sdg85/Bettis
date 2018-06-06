import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const fixture = props => {
    const fixture = props.fixture;
    let view = fixture ?
        <FixtureContainer>
            <Header>{`${moment(fixture.date).format("HH:mm")}`}</Header>
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
        </FixtureContainer> : "No Games today :(";
    return (
        view
    );
}

export default fixture;

const FixtureContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;  
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

const DateText = styled.h1`
    color: #000;
    margin: 10px;
`;