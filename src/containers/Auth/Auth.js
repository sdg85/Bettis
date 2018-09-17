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
        form: {
            firstName: {
                value: "",
                valid: false,
                touched: false,
                placeholder: "first name"
            },
            lastName: {
                value: "",
                valid: false,
                touched: false,
                placeholder: "last name"
            },
            email: {
                value: "",
                valid: false,
                touched: false,
                placeholder: "email"
            },
            password: {
                value: "",
                valid: false,
                touched: false,
                placeholder: "password"
            },
            imgUrl: {
                value: "",
                valid: false,
                placeholder: "image"
            }
        }
    }

    onChangedHandler = (e) => {
        if (e.target.id === "file")
            this.uploadFile(e.target.files[0]);

        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [e.target.id]: { ...this.state.form[e.target.id], value: e.target.value, touched: true, valid: e.target.value }
            }
        });
    }

    //Submit the form
    onSubmitHandler = (e) => {
        e.preventDefault();
        const signUp = e.target.name === "signup" ? true : false;

        //if signup form then validate all inputs
        if (signUp) {
            
            for (let key in this.state.form) {
                const element = this.state.form[key];

                if (!element.valid) {
                    alert(`The form is not valid, ${element.placeholder} is required.`);
                    return;
                }
            }
        }
        //if signin validate only email & password
        else {
            const email = this.state.form["email"];
            const password = this.state.form["password"];

            if(!email.valid){
                alert(`Email is required.`);
                return;
            }
            if(!password.valid){
                alert(`Password is required.`);
                return;
            }
        }

        this.props.onAuth(this.state.form.firstName.value,
            this.state.form.lastName.value,
            this.state.form.email.value,
            this.state.form.password.value,
            this.state.form.imgUrl.value, signUp);
}

//Store characters from email input to the state
uploadFile = file => {
    if (file) {
        //create storage ref
        var storageRef = firebase.storage().ref(`/images/${this.state.form.firstName.value}.${this.state.form.lastName.value}`);

        //upload file
        var task = storageRef.put(file);

        //task progress
        task.on('state_changed',
            //upload progress    
            snapshot => console.log((Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + " %")),
            //upload error
            error => console.log(error),
            //upload complete. Set the url of the uploaded image to the state.
            () => {
                storageRef.getDownloadURL().then(url => this.setState({
                    ...this.state,
                    form: {
                        ...this.state.form,
                        imgUrl: { ...this.state.form.imgUrl, value: url, touched: true, valid: true }
                    }
                }));
            });
    }
}

render() {
    // console.log(this.props.location);
    let authView = this.props.match.url === "/signup" ?
        <SignUpForm
            fields={this.state.form}
            onChanged={this.onChangedHandler}
            submit={this.onSubmitHandler} /> :
        <SignInForm
            submit={this.onSubmitHandler}
            email={this.state.form.email}
            password={this.state.form.password}
            onChanged={this.onChangedHandler} />

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