import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodaysFixtures, saveNewBet, fetchBets, saveChangedBet, deleteBet } from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import Fixture from '../../components/Fixtures/Fixture/Fixture';

class Betting extends Component {

  componentDidMount() {
    this.props.onGetBets();
    this.props.onFetchTodaysFixtures();
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

    if (this.props.tokenId) {
      view = this.props.fixtures ? this.props.fixtures.map(fixture => {
        const bets = this.props.bets;
        const bet = bets ? bets.find(bet => bet.fixtureId === fixture.id) : null;
        return <Fixture
          key={fixture.id}
          bet={bet}
          fixture={fixture}
          clicked={this.onClickedFixture} />
      }) : "NO MATCHES TODAY";
    }
    else {
      view = <Redirect to={{
        pathname: "/signin",
        state: { from: "/" }
      }} />;
    }

    return (
      view
    );
  }
}

const mapStateToProps = state => {
  return {
    fixtures: state.fixturesReducer.fixtures,
    bets: state.betsReducer.bets,
    tokenId: state.auth.tokenId
    // array: state.testReducer.array
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

export default connect(mapStateToProps, mapDispatchToProps)(Betting);
