import React, {Component} from 'react';
import axios from 'axios';
import {connect} from  'react-redux';
import {getUser} from '../../redux/reducer';

 class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            createPassword: '',
            email: '',
            firstName: '',
            lastName: '',
            picture: ''
        }
        this.register = this.register.bind(this)
    }

    register(){
        const {username, createPassword, email, firstName, lastName, picture } = this.state
        axios.post("/auth/Register", 
        {username: username, password: createPassword, email: email, first_name: firstName, last_name: lastName, picture: picture})
        .then(res => {
            this.props.getUser(res.data);
        })
    }

    universalChangeHandler(property, value) {
        this.setState({
            [property]: value
        });
    }

    render(){
        console.log(this.state)
        const {username, createPassword, email, firstName, lastName, picture } = this.state
        return (
            <div>
                <input placeholder='username' name='username' type='username' value={username} onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
                <input placeholder='createPassword' name='createPassword' type='createPassword' value={createPassword} onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
                <input placeholder='email' name='email' type='email' value={email} onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
                <input placeholder='firstName' name='firstName' type='firstName' value={firstName} onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
                <input placeholder='lastName' name='lastName' type='lastName' value={lastName} onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
                <input placeholder='picture' name='picture' type='picture' value={picture} onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
                <button onClick={this.register}>Create Profile</button>
            </div>
        )
    }
}



function mapReduxToProps(reduxState){
    return reduxState;
}

const mapDispatchToProps = {
    getUser
};

const connectInvoked = connect(
    mapReduxToProps,
    mapDispatchToProps
);

export default connectInvoked(Register);