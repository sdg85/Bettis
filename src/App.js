import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchTodaysFixtures } from './store/actions/index';
import Fixture from './components/Fixtures/Fixture/Fixture';

class App extends Component {

  componentDidMount(){
    this.props.onFetchTodaysFixtures();
  }

  render() {
    let view = this.props.fixtures ? this.props.fixtures.map(fixture => (
      <Fixture key={fixture.id} fixture={fixture} />
    )) : "NO MATCHES TODAY";
    return (
      <Container>
        <Toolbar />
        {view}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    fixtures: state.fixturesReducer.fixtures
  }
}

const mapDispatchToProps = disapatch => {
  return {
    onFetchTodaysFixtures: () => disapatch(fetchTodaysFixtures())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Toolbar = styled.div`
  width: 100%;
  background-color: #f1f1f1;
  height: 100px; 
`;

const Container = styled.div`
  background-color: #8e0809;
`;
