import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodaysFixtures, saveNewUserBet, fetchUserBets, saveChangedUserBet, deleteUserBet, fetchAllBets, fetchAllFixtures } from '../../store/actions/index';
import Fixture from '../../components/Fixtures/Fixture/Fixture';
import styled from 'styled-components';

class Betting extends Component {

  async componentDidMount() {
    //if not authenticated then nav to login page
    if (!this.props.authenticated) {
      this.props.history.push({ pathname: "/signin", state: { from: "/" } });
    }
    else {
      //if authenticated then get user bets and todays fixtures
      await this.props.onFetchAllFixtures();
      this.props.onGetUserBets();
      this.props.onFetchTodaysFixtures();
    }
  }

  onClickedFixture = (choice, fixtureId) => {
    const betsArray = Object.values(this.props.userBets);

    const oldBet = betsArray.find(bet => bet.fixtureId === fixtureId);
    console.log(oldBet);
    const userBet = fixtureId + "_" + this.props.userId;

    if (!this.props.authenticated) {
      this.props.history.push("/signin");
    }
    else if (oldBet && oldBet.bet === choice) {
      console.log("remove bet: ", userBet);
      const bet = { betId: userBet, fixtureId: fixtureId };
      this.props.onRemoveBet(bet);
    }
    else if (oldBet) {
      const bet = { [userBet]: { betId: userBet, fixtureId: fixtureId, bet: choice, userId: this.props.userId } };
      console.log("change bet: ", bet);
      this.props.onChangeBet(bet);
    }
    else {
      const bet = { [userBet]: { betId: userBet, fixtureId: fixtureId, bet: choice, userId: this.props.userId } };
      console.log("new bet", bet);
      this.props.onSaveBet(bet);
    }
  }

  render() {
    let view = null;
    let errorMessage = this.props.error ? <MessageContainer><h4>{`${this.props.error}`}</h4></MessageContainer> : null;

    if (this.props.loading) {
      view = <MessageContainer><h4>Loading....</h4></MessageContainer>
    }

    const bets = this.props.userBets;
    view = this.props.loading ? "Loading..." : this.props.todaysFixtures.length > 0 ? this.props.todaysFixtures.map(fixture => 
      {
      const bet = bets.length > 0 ? bets.find(bet => bet.fixtureId === fixture.id) : null;
      
      return <Fixture
        key={fixture.id}
        loading={this.props.betLoading ? this.props.betLoading.fixtureId === fixture.id : false}
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
    todaysFixtures: state.fixturesReducer.todaysFixtures,
    allFixtures: state.fixturesReducer.allFixtures,
    userBets: state.betsReducer.userBets,
    authenticated: state.auth.tokenId ? true : false,
    userId: state.auth.userId,
    error: state.fixturesReducer.error,
    loading: state.fixturesReducer.loading,
    betLoading: state.betsReducer.betLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTodaysFixtures: () => dispatch(fetchTodaysFixtures()),
    onFetchAllFixtures: () => dispatch(fetchAllFixtures()),
    onGetUserBets: () => dispatch(fetchUserBets()),
    onSaveBet: bet => dispatch(saveNewUserBet(bet)),
    onRemoveBet: bet => dispatch(deleteUserBet(bet)),
    onChangeBet: (bet) => dispatch(saveChangedUserBet(bet))
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
