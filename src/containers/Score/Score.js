import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchAllFixtures, fetchAllBets } from '../../store/actions/index';


class Score extends Component {

    async componentDidMount() {
        if (!this.props.authenticated) {
            this.props.history.push({ pathname: "/signin", state: { from: "table" } });
        }
        else
            this.props.onGetBets();
    }

    render() {
        let view = this.props.loading ? "LOADING..." : this.props.bets.map((bet, index) => <ListItemContainer key={bet.betId}><Img src="https://firebasestorage.googleapis.com/v0/b/bettis-app.appspot.com/o/images%2Ftest4.testing4?alt=media&token=aafd75bc-7e51-4a11-8583-43718f8aef5c" /> <Content>{`: ${bet.bet} - ${bet.fixtureId}`}</Content></ListItemContainer>)
        return (
            view
        );
    }
}

const mapStateToProps = state => {
    return {
        bets: state.betsReducer.allBets,
        allFixtures: state.fixturesReducer.allFixtures,
        scores: state.standings.scores,
        loading: state.betsReducer.loading,
        error: state.standings.error,
        authenticated: state.auth.tokenId ? true : false
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllFixtures: () => dispatch(fetchAllFixtures()),
        onGetBets: () => dispatch(fetchAllBets())
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