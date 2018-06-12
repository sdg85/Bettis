import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodaysFixtures, onBet, removeBet, changeBet } from '../../store/actions/index';
import Fixture from '../../components/Fixtures/Fixture/Fixture';

class Betting extends Component {

  componentDidMount() {
    this.props.onFetchTodaysFixtures();
  }

  onClickedFixture = (choice, fixtureId) => {
    const oldBet = this.props.bets.find(bet => bet.fixtureId === fixtureId);

    if (oldBet) {
      if (oldBet.bet === choice)
        this.props.onRemoveBet(oldBet.fixtureId);
      else
        this.props.onChangeBet({ fixtureId: fixtureId, bet: choice });
    }
    else {
      const bet = { fixtureId: fixtureId, bet: choice };
      this.props.onBet(bet);
    }

  }

  render() {
    let view = this.props.fixtures ? this.props.fixtures.map(fixture => {
      const bet = this.props.bets.find(bet => bet.fixtureId === fixture.id);
      return <Fixture
        key={fixture.id}
        bet={bet}
        fixture={fixture}
        clicked={this.onClickedFixture} />
    }) : "NO MATCHES TODAY";

    return (
        view
    );
  }
}

const mapStateToProps = state => {
  return {
    fixtures: state.fixturesReducer.fixtures,
    bets: state.fixturesReducer.bets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTodaysFixtures: () => dispatch(fetchTodaysFixtures()),
    onBet: bet => dispatch(onBet(bet)),
    onRemoveBet: fixtureId => dispatch(removeBet(fixtureId)),
    onChangeBet: bet => dispatch(changeBet(bet))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Betting);
