import React from 'react';
import styled from 'styled-components';

const fixture = props => {
    console.log(props.fixture);
    const fixture = props.fixture;
    let view = fixture ? 
    <FixtureContainer>
        <Header>{`Match day ${fixture.matchDay}`}</Header>
        <TeamsContainer>
            {`${fixture.homeTeam} vs ${fixture.awayTeam}`}
        </TeamsContainer>
        <DateText>{fixture.date}</DateText>
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
`;

const Header = styled.div`
    background-color: #cf0c1e;
    padding: 10px;
`;

const MatchDayText = styled.h2`
    color: #fff;
`;

const TeamsContainer = styled.div`
    padding: 5px;
    background-color: #fff;
`;

const TeamName = styled.h4`
    color: #000;
`;

const DateText = styled.h1`
    color: #000;
    margin: 10px;
`;