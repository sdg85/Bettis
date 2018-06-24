import React, { Component } from 'react';

class Auth extends Component {
    state = {
        user: {
            userId: "",
            username: '',
            password: '',
            imagePath: ""
        }
    }

    onSubmitHandler = (e) => {
        e.prevenDefault();
        console.log(e);
    }

    onUsernameChangeHandler = (e) => {
        this.setState({
            user: {
                username: e.target.value
            }
        });
    }

    onPasswordChangeHandler = (e) => {
        this.setState({
            user: {
                password: e.target.value
            }
        });
    }

    render(){
        return(
            <form onSubmit={this.onSubmitHandler}>
                <input 
                    value={this.state.user.username} 
                    type="text" 
                    placeholder="Username..."
                    onChange={this.onUsernameChangeHandler} />  
                <input 
                    value={this.state.user.password} 
                    type="password" 
                    placeholder="Passoword..."
                    onChange={this.onPasswordChangeHandler} />
                <button type="submit" >Sign in</button>
            </form>
            
        );
    }
}

export default Auth;