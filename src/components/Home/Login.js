import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer';
import './Login.scss'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }

        
    }

    login(e){
        e.preventDefault();
        const {email, password} = this.state
        axios.post('/auth/login', {email: email, password: password})
        .then(res => {
            console.log(res)
            if (res.data.message){
                alert(res.data.message)
            }
            else {
                this.props.getUser(res.data);
                this.props.history.push('/Profile');
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
                <form className="login-container">
                    <div className='inputs'>
                        <input placeholder='email' name='email' type='email' onChange={e => this.universalChangeHandler(e.target.name, e.target.value)} />
                        <input placeholder='password' name='password' type='password' onChange={e => this.universalChangeHandler(e.target.name, e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={(e)=>this.login(e)}>Login</button>
                        <Link exact to='/Register'><button>Register</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}


function mapReduxToProps(reduxState){
    return reduxState
}

const mapDispatchToProps = {
    getUser
}

const connectInvoked = connect(
    mapReduxToProps,
    mapDispatchToProps
)

export default connectInvoked(Login);