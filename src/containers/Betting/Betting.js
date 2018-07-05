import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodaysFixtures, saveNewBet, fetchBets, saveChangedBet, deleteBet } from '../../store/actions/index';
import Fixture from '../../components/Fixtures/Fixture/Fixture';
import styled from 'styled-components';

class Betting extends Component {

  componentDidMount() {
    if (!this.props.authenticated)
      this.props.history.push("/signin");
    else {
      // this.props.onGetBets();
      this.props.onFetchTodaysFixtures();
    }

  }

  onClickedFixture = (choice, fixtureId) => {
    const oldBet = this.props.bets.find(bet => bet.fixtureId === fixtureId);

    if (oldBet && oldBet.bet === choice) {
      this.props.onRemoveBet(oldBet.fixtureId);
    }
    else if (oldBet) {
      const bet = { [fixtureId]: { fixtureId: fixtureId, bet: choice } };
      this.props.onChangeBet(bet);
    }
    else {
      const bet = { [fixtureId]: { fixtureId: fixtureId, bet: choice } };
      this.props.onSaveBet(bet);
    }
  }

  render() {

    let view = null;
    let errorMessage = this.props.error ? <MessageContainer><h4>{`${this.props.error}`}</h4></MessageContainer> : null;

    if (this.props.loading) {
      view = <MessageContainer><h4>Loading....</h4></MessageContainer>
    }

    view = this.props.fixtures ? this.props.fixtures.map(fixture => {
      const bets = this.props.bets;
      const bet = bets ? bets.find(bet => bet.fixtureId === fixture.id) : null;
      return <Fixture
        key={fixture.id}
        bet={bet}
        fixture={fixture}
        clicked={this.onClickedFixture} />
    }) : "NO MATCHES TODAY";

    return (
      <div>
        {errorMessage}
        {view}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.fixturesReducer.loading);
  return {
    fixtures: state.fixturesReducer.fixtures,
    bets: state.betsReducer.bets,
    authenticated: state.auth.tokenId ? true : false,
    error: state.fixturesReducer.error,
    loading: state.fixturesReducer.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTodaysFixtures: () => dispatch(fetchTodaysFixtures()),
    onSaveBet: bet => dispatch(saveNewBet(bet)),
    onRemoveBet: fixtureId => dispatch(deleteBet(fixtureId)),
    onGetBets: () => dispatch(fetchBets()),
    onChangeBet: (bet) => dispatch(saveChangedBet(bet))
  }
}

const MessageContainer = styled.div`
  text-align: center; 
  color: #cf0c1e; 
  background-color: #fff;
  padding: 5px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Betting);
