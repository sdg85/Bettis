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
      this.props.onGetBets();
      this.props.onFetchTodaysFixtures();
    }

  }

  onClickedFixture = (choice, fixtureId) => {
    const oldBet = this.props.bets.find(bet => bet.fixtureId === fixtureId);
    if(!this.props.tokenId){
      this.props.history.push("/signin");
      return;
    }
    if (oldBet && oldBet.bet === choice) {
      this.props.onRemoveBet(oldBet.fixtureId);
    }
    else if (oldBet) {
      const bet = { [fixtureId + "_" + this.props.userId]: { fixtureId: fixtureId, bet: choice, userId: this.props.userId } };
      this.props.onChangeBet(bet);
    }
    else {
      const bet = { [fixtureId + "_" + this.props.userId]: { fixtureId: fixtureId, bet: choice, userId: this.props.userId } };
      this.props.onSaveBet(bet);
    }
  }

  render() {

    let view = null;
    let errorMessage = this.props.error ? <MessageContainer><h4>{`${this.props.error}`}</h4></MessageContainer> : null;

    if (this.props.loading) {
      view = <MessageContainer><h4>Loading....</h4></MessageContainer>
    }

    view = this.props.fixtures.length > 0 ? this.props.fixtures.map(fixture => {
      const bets = this.props.bets;
      const bet = bets ? bets.find(bet => bet.fixtureId === fixture.id) : null;
      return <Fixture
        key={fixture.id}
        bet={bet}
        fixture={fixture}
        clicked={this.onClickedFixture} />
    }) : <NoGames>NO GAMES TODAY :(</NoGames>;

    return (
      <FixturesContainer>
        {errorMessage}
        {view}
      </FixturesContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    fixtures: state.fixturesReducer.fixtures,
    bets: state.betsReducer.bets,
    authenticated: state.auth.tokenId ? true : false,
    userId: state.auth.userId,
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

const FixturesContainer = styled.div`
  @media(min-width: 800px){
        width: 800px;
        margin-left: auto;
        margin-right: auto;
  }
`;

const NoGames = styled.h2`
  background-color: rgba(255,255,255,0.9);
  color: #cf0c1e;
  text-align: center;
  padding: 10px;

  @media(max-width: 800px){
    margin: 0 10px
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Betting);
