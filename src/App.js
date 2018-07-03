import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Betting from './containers/Betting/Betting';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Auth from './containers/Auth/Auth';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Container>
          <Toolbar />
          <Switch>
            <Route path="/table" render={ render => {
              return (
                <h1>Table Page</h1>
              );
            }} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={Betting} />
            <Route path="/signin" component={Auth} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    tokenId: state.auth.tokenId
  }
}
export default connect(mapStateToProps)(App);

const Container = styled.div`
  /* background-color: #8e0809; */
  margin-top: 150px;
`;
