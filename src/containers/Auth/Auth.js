import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import { auth } from '../../store/actions/index';
import styled from 'styled-components';
import firebase from '../../firebase';
import Spinner from '../../components/UI/Spinners/Spinner/Spinner';

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
            },
            formValid: false
        },
        loading: false,
    }

    onChangedHandler = (e) => {
        //if it is a file input then upload selected file
        if (e.target.id === "file")
            this.uploadFile(e.target.files[0]);
        else {
            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    [e.target.id]: { ...this.state.form[e.target.id], value: e.target.value, touched: true, valid: e.target.value !== "" }
                }
            }, () => this.validate());
        }
    }

    //validate form
    validate = () => {
        let valid = true;
        for (let key in this.state.form) {
            if (key === "formValid")
                continue;

            let element = this.state.form[key];

            if (!element.valid)
                valid = false;
        }
        this.setState({ ...this.state, form: { ...this.state.form, formValid: valid } }, () => console.log(this.state.form.formValid));
    }

    //Submit the form
    onSubmitHandler = (e) => {
        e.preventDefault();
        const signUp = e.target.name === "signup" ? true : false;

        //if signup form then validate all inputs
        if (signUp) {

            for (let key in this.state.form) {
                if (key === "formValid")
                    continue;

                const element = this.state.form[key];

                if (!element.valid) {
                    alert(`The form is not valid, ${element.placeholder} is required.`);
                    return;
                }
            }
        }
        //if signin, validate only email & password
        else {
            const email = this.state.form["email"];
            const password = this.state.form["password"];

            if (!email.valid) {
                alert(`Email is required.`);
                return;
            }
            if (!password.valid) {
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

    // Upload file to firebase storage and download the url to the file and save it to the ImgUrl in the state
    uploadFile = file => {
        if (!file)
            return;

        this.setState({ loading: true });

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {

            getOrientation(file, orientation => resetOrientation(reader.result, orientation, (resetBase64Image) => {
                // //create storage ref
                var storageRef = firebase.storage().ref(`/images/${this.state.form.firstName.value}.${this.state.form.lastName.value}`);

                //upload file
                var task = storageRef.putString(resetBase64Image, "data_url", { contentType: "image/jpg" });

                //task progress
                task.on('state_changed',
                    //upload progress    
                    snapshot => console.log(this.state.loading, (Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + " %")),
                    //upload error
                    error => console.log(error),
                    //upload complete. Set the url of the uploaded image to the state.
                    () => {
                        storageRef.getDownloadURL().then(url => this.setState({
                            ...this.state,
                            loading: false,
                            form: {
                                ...this.state.form,
                                imgUrl: { ...this.state.form.imgUrl, value: url, touched: true, valid: true }
                            }
                        }, () => this.validate()));
                    });
            }));
        }
    }

    render() {
        // console.log(this.props.location);
        let authView = this.props.match.url === "/signup" ?
            <SignUpForm
                fields={this.state.form}
                loading={this.state.loading}
                formValid={this.state.form.formValid}
                onChanged={this.onChangedHandler}
                submit={this.onSubmitHandler} /> :
            <SignInForm
                submit={this.onSubmitHandler}
                email={this.state.form.email}
                password={this.state.form.password}
                onChanged={this.onChangedHandler} />

        let view = this.props.loading ? <Spinner /> : this.props.tokenId ? <Redirect to={{
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


//helpers
//get orientation
const getOrientation = (file, callback) => {
    var reader = new FileReader();
    reader.onload = function (e) {

        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) != 0xFFD8) {
            return callback(-2);
        }
        var length = view.byteLength, offset = 2;
        while (offset < length) {
            if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966) {
                    return callback(-1);
                }

                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++) {
                    if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
                    }
                }
            }
            else if ((marker & 0xFF00) != 0xFF00) {
                break;
            }
            else {
                offset += view.getUint16(offset, false);
            }
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file);
}

const resetOrientation = (srcBase64, srcOrientation, callback) => {
    var img = new Image();

    img.onload = function () {
        var width = img.width,
            height = img.height,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext("2d");

        // set proper canvas dimensions before transform & export
        if (4 < srcOrientation && srcOrientation < 9) {
            canvas.width = height;
            canvas.height = width;
        } else {
            canvas.width = width;
            canvas.height = height;
        }

        // transform context before drawing image
        switch (srcOrientation) {
            case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
            case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
            case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
            case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
            case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
            case 7: ctx.transform(0, -1, -1, 0, height, width); break;
            case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
            default: break;
        }

        // draw image
        ctx.drawImage(img, 0, 0);

        // export base64
        callback(canvas.toDataURL());
    };

    img.src = srcBase64;
}
