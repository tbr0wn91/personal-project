import React, {Component } from 'react';
import {connect} from 'react-redux';
import './Profile.scss';

 function Profile(props){
    console.log(props)
    return(
    <div className="profile-container">
        <div className="content">
            <div>
                <h1>
                    {props.user.picture}
                </h1>
            </div>
            <div>
                <h1>
                    {props.user.username}
                </h1>
            </div>
            <div>
                <h1>
                    {props.user.FirstName}
                </h1>
            </div>
            <div>
                <h1>
                    {props.user.LastName}
                </h1>
            </div>
            <div>
                <h1>
                    {props.user.email}
                </h1>
            </div>
        </div> 
    </div>
    );
}

function mapStateToProps(reduxState){
    return reduxState
}

export default connect(mapStateToProps)(Profile);