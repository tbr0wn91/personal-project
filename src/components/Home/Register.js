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
    }

    register(){
        const {username, createPassword, email, firstName, lastName, picture } = this.state
        axios.post("/auth/Register", 
        {username: username, createPassword: createPassword, email: email, firstName: firstName, lastName: lastName, picture: picture})
        .then(res => {
            this.props.getUser(res.data);
        })
    }

    render(){
        return (
            <div>Register</div>
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