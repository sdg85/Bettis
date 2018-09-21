import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchAllFixtures, fetchAllBets, fetchUsers } from '../../store/actions/index';


class Score extends Component {

    async componentDidMount() {
        if (!this.props.authenticated) {
            this.props.history.push({ pathname: "/signin", state: { from: "table" } });
        }
        else {
            this.props.onGetBets();
            this.props.onGetUsers();
            this.props.onGetAllFixtures();
        }
    }

    render() {
        const bets = this.props.bets;
        const fixtures = this.props.allFixtures;
        const users = this.props.users;

        const playersResult = calculatePlayersResult(fixtures, bets, users);

        const tableView = playersResult.map((playerResult, index) =>
            <Tr key={index}>
                <Td ><Img src={playerResult.imgUrl} /></Td>
                <Td>{playerResult.name}</Td>
                <Td>{playerResult.betted}</Td>
                <Td>{playerResult.won}</Td>
                <Td>{playerResult.lost}</Td>
                <Td>{playerResult.points}</Td>
            </Tr>
        );

        return (
            <Table>
                <TableHeader>
                    <Tr>
                        <Td></Td>
                        <Td>Name</Td>
                        <Td>B</Td>
                        <Td>W</Td>
                        <Td>L</Td>
                        <Td>P</Td>
                    </Tr>
                </TableHeader>
                <tbody>
                   {tableView}
                </tbody>
            </Table>
        );
    }
}

//Calculate players result
const calculatePlayersResult = (fixtures, bets, users) => {
    const playersResult = users ? users.map(user => {
        const player = {
            imgUrl: user.imgUrl,
            name: "",
            points: 0,
            betted: 0,
            lost: 0,
            won: 0
        };

        const userBets = bets ? bets.filter(bet => bet.userId === user.userId) : [];

        for (let bet of userBets) {
            for (let fixture of fixtures) {
                if (bet.fixtureId === fixture.id) {
                    if (bet.bet === fixture.winner) {
                        player.points += 3; //3p for betting right
                        player.won += 1;
                    }
                    else {
                        player.lost += 1
                    }
                }
            }
        }

        player.name = `${user.firstname} ${user.lastname}`;
        player.betted = userBets.length; //how many times player betted
        player.points += userBets.length //1 point for each bet

        return player;

    }) : "There's no scores to show rigth now!";

    //Sort playersResult
    playersResult.sort((a, b) => b.points - a.points);
    return playersResult;
}

const mapStateToProps = state => {
    return {
        bets: state.betsReducer.allBets,
        users: state.usersReducer.users,
        allFixtures: state.fixturesReducer.allFixtures,
        fixturesLoading: state.fixturesReducer.loading,
        scores: state.standings.scores,
        betsLoading: state.betsReducer.loading,
        usersLoading: state.usersReducer.loading,
        error: state.standings.error,
        authenticated: state.auth.tokenId ? true : false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllFixtures: () => dispatch(fetchAllFixtures()),
        onGetBets: () => dispatch(fetchAllBets()),
        onGetUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);

const Table = styled.table`
    border: 1px solid #eee5c6;
    width: 90%;
    margin: 0 auto;
    border-collapse: collapse;
    background-color: rgba(255,255,255,0.81);
    box-shadow: 0.05rem 0.05rem 1.1rem rgba(20,20,20,0.2);
`;

const TableHeader = styled.thead`
    background-color: #365079;
    color: #fff;
`;

const Td = styled.td`
    align-self: center;
    padding: 5px;
    /* border: 1px solid #000; */
`;

const Img = styled.img`
    align-self: center;
    padding: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const Tr = styled.tr`
    border-bottom: 1px solid #eee5c6;
`;