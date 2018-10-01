import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';

import Betting from './containers/Betting/Betting';
import Score from './containers/Score/Score';
import Auth from './containers/Auth/Auth';

import Toolbar from './components/Navigation/Toolbar/Toolbar';
import SideNav from './components/UI/SideNav/SideNave';

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
        <Toolbar openSideNav={this.sideNavToggleHandler} />
        <SideNav isOpen={this.state.open} // maybe make the sidenav a stateful component
          closeSideNav={this.closeSideNavHandler}
          logout={this.logoutHandler}
          authenticated={this.props.authenticated} />
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
  /* width:100%;
  height:100%;
  background-image:url("./assets/background.jpg");
  background-size: cover;
  background-attachment:fixed; */
  /* -webkit-background-size: 100%; 
  -moz-background-size: 100%; 
  -o-background-size: 100%; 
  background-size: 100%;  */
  /* -webkit-background-size: cover; 
  -moz-background-size: cover; 
  -o-background-size: cover;  */
  /* background-size:cover; */
    
  margin-top: 150px;
`;
