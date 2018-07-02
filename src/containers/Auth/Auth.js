import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import { auth } from '../../store/actions/index';

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
        this.props.onAuthenticate(this.state.email, this.state.password);
    }

    // onFirstNameChangeHandler = (e) => {
    //     this.setState({
    //         firstName: e.target.value
    //     });
    // }

    // onLastNameChangeHandler = (e) => {
    //     this.setState({
    //         lastName: e.target.value
    //     });
    // }

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
        console.log(this.props.tokenId);
        let view = this.props.loading ? <h4>Loading...</h4> : this.props.tokenId ? <Redirect to="/table" /> :
            <SignUpForm
                submit={this.onSubmitHandler}
                email={this.state.email}
                password={this.state.password}
                emailChanged={this.onEmailChangeHandler}
                passwordChanged={this.onPasswordChangeHandler} />

        let error = this.props.error ? <h4 style={{ color: "red", margin: 10, backgroundColor: "#fff", textAlign: "center", padding: 10 }}>{this.props.error}</h4> : null;

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
        onAuthenticate: (email, password) => dispatch(auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

