import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Betting from './containers/Betting/Betting';
import Toolbar from './components/Navigation/Toolbar/Toolbar';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Container>
          <Toolbar />
          <Switch>
            <Route path="/table" render={render => {
              return (
                <h1>Table Page</h1>
              );
            }} />
            <Route path="/" exact component={Betting} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;

const Container = styled.div`
  /* background-color: #8e0809; */
  margin-top: 150px;
`;
