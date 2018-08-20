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

        const playersResult = users ? users.map(user => {
            const player = {
                name: "",
                points: 0,
                betted: 0,
                lost: 0,
                won: 0
            };

            const userBets = bets ? bets.filter(bet => bet.userId === user.userId) : [];
            
            for (let bet of userBets) {
                for(let fixture of fixtures){
                    if (bet.fixtureId === fixture.id) {
                        if (bet.bet === fixture.winner) {
                            player.points += 3;
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
        console.log(playersResult);
        return (
            <div>

            </div>
        );
    }
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

const Content = styled.div`
    align-self: center;
    padding: 5px;
`;

const Img = styled.img`
    align-self: center;
    padding: 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const ListItemContainer = styled.li`
    display: flex;
    background-color: rgba(255,255,255,0.9);
    color: #cf0c1e;
    padding: 10px;
    margin: 5px 10px;

    @media(min-width: 800px){
        width: 800px
        margin: 5px auto;
    }
`;