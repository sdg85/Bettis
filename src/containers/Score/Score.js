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
        const betsView = bets ? bets.map(bet => <li key={bet.betId}>{bet.betId}</li>) : <h4>There's no bets to show</h4>;
        const fixtures = this.props.allFixtures;
        const users = this.props.users;
        
        return (
            <div>
                { betsView }
                {  }
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