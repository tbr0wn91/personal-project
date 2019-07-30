import React, {Component} from 'react';
import axios from 'axios'

 export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        this.login = this.login.bind(this);
    }

    login(){
        const {email, password} = this.state
        axios.post('/auth/login', {email: email, password: password})
        .then(res => {
            console.log(res)
            if (res.data.message){
                alert(res.data.message)
            }
            else {
                this.setState({
                    email: res.data.email,
                    password: res.data.password
                })
            }
        })
    }

    universalChangeHandler(property, value) {
        this.setState({
            [property]: value
        });
    }

    render(){
        console.log(this.state)
        return(
            <div>

                <input placeholder='email' name='email' type='email' onChange={e => this.universalChangeHandler(e.target.name, e.target.value)} />
                <input placeholder='password' name='password' type='password' onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
                <button onClick={this.login}>Login</button>
                <button>Register</button>
            </div>
        )
    }
}
