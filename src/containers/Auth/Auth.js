import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import { auth } from '../../store/actions/index';
import styled from 'styled-components';
import firebase from '../../firebase';

class Auth extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        imgUrl: null,
        password: ""
    }

    onChangedHandler = (e) => {
        switch (e.target.id) {
            case "firstName":
                this.setState({ firstName: e.target.value });
                break;
            case "lastName":
                this.setState({ lastName: e.target.value });
                break;
            case "password":
                this.setState({ password: e.target.value });
                break;
            case "email":
                this.setState({ email: e.target.value });
                break;
            case "file":
                this.uploadFile(e.target.files[0]);
                break;
                default: break;
        }
    }
    //Submit the form
    onSubmitHandler = (e) => {
        e.preventDefault();
        const signUp = e.target.name === "signup" ? true : false;
        this.props.onAuth(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.state.imgUrl, signUp);
    }

    //Store characters from email input to the state
    uploadFile = file => {
        if (file) {
            //create storage ref
            var storageRef = firebase.storage().ref(`/images/${this.state.firstName}.${this.state.lastName}`);

            //upload file
            var task = storageRef.put(file);

            //task progress
            task.on('state_changed',
                //upload progress    
                snapshot => console.log((Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + " %")),
                //upload error
                error => console.log(error),
                //upload complete
                () => {
                    storageRef.getDownloadURL().then(url => this.setState({ imgUrl: url }));
                });
        }
    }

    //Store first name to state
    onFirstNameChangedHandler = () => {

    }

    //Store last name to state
    onLastNameChangedHandler = () => {

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
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                email={this.state.email}
                password={this.state.password}
                firstNameChanged={this.onChangedHandler}
                lastNameChanged={this.onChangedHandler}
                emailChanged={this.onChangedHandler}
                passwordChanged={this.onChangedHandler}
                fileUploadChanged={this.onChangedHandler}
                imgUrl={this.state.imgUrl} /> :
            <SignInForm
                submit={this.onSubmitHandler}
                email={this.state.email}
                password={this.state.password}
                emailChanged={this.onEmailChangeHandler}
                passwordChanged={this.onPasswordChangeHandler} />

        let view = this.props.loading ? <h4>loading...</h4> : this.props.tokenId ? <Redirect to={{
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
        userId: state.auth.userId,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (firstname, lastname, email, password, imgUrl, signUp) => dispatch(auth(firstname, lastname, email, password, imgUrl, signUp))
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