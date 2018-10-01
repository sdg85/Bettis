import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';

import Betting from './containers/Betting/Betting';
import Score from './containers/Score/Score';
import Auth from './containers/Auth/Auth';

import Navbar from './components/Navbar/Navbar';
import SideNav from './containers/SideNav/SideNav';

class App extends Component {
  state = {
    open: false
  }

  sideNavToggleHandler = () => {
    this.setState((prevState) => {
      return { open: !prevState.open }
    });
  }
  closeSideNavHandler = () => {
    this.setState({
      ...this.state,
      open: false
    })
  }

  logoutHandler = () => {
    this.closeSideNavHandler();
    this.props.onLogout();
  }

  render() {
    return (
      <Container>
        <Navbar openSideNav={this.sideNavToggleHandler} />
        <SideNav
          isOpen={this.state.open}
          close={this.closeSideNavHandler} />
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
  margin-top: 150px;
`;
