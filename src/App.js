import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Betting from './containers/Betting/Betting';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Score from './containers/Score/Score';
import Auth from './containers/Auth/Auth';

class App extends Component {

  render() {
    return (
      <Container>
        <Toolbar />
        <Switch>
          <Route path="/table" component={Score} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={Betting} />
          <Route path="/signin" component={Auth} />
          <Route path="/signup" component={Auth} />
        </Switch>
      </Container>
    );
  }
}

export default App;

const Container = styled.div`
  /* background-color: #8e0809; */
  margin-top: 150px;
`;
