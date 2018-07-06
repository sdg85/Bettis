import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import { auth } from '../../store/actions/index';
import styled from 'styled-components';

class Auth extends Component {
    state = {
        // userId: "",
        // firstName: "",
        // lastName: "",
        email: "",
        password: "",
        // imagePath: ""
    }

    //Submit the form
    onSubmitHandler = (e) => {
        e.preventDefault();

        const signUp = e.target.name === "signup" ? true : false;
        this.props.onAuth(this.state.email, this.state.password, signUp);
    }

    //Store characters from email input to the state
    onEmailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    //Store characters from password input to the state
    onPasswordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        // console.log(this.props.location);
        let authView = this.props.match.url === "/signup" ?
            <SignUpForm
                submit={this.onSubmitHandler}
                email={this.state.email}
                password={this.state.password}
                emailChanged={this.onEmailChangeHandler}
                passwordChanged={this.onPasswordChangeHandler} /> :
            <SignInForm
                submit={this.onSubmitHandler}
                email={this.state.email}
                password={this.state.password}
                emailChanged={this.onEmailChangeHandler}
                passwordChanged={this.onPasswordChangeHandler} />


        let view = this.props.loading ? <h4>Loading...</h4> : this.props.tokenId ? <Redirect to={{
            pathname: this.props.location.state ? this.props.location.state.from : "/table"
        }} /> : authView;


        let error = this.props.error ? <Error>{this.props.error}</Error> : null;

        return (
            <div>
                {error}
                {view}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tokenId: state.auth.tokenId,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signUp) => dispatch(auth(email, password, signUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

const Error = styled.h4`
    color: #cf0c1e; 
    margin: 10px; 
    background-color: #fff; 
    text-align: center; 
    padding: 10px
`;