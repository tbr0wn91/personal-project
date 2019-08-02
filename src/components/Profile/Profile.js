import React, {Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Profile.scss';

 function Profile(props){
    console.log(props)
    return(
    <div className="profile-container">
        <div className="content">
            <div>
                <img src={props.user.picture} />
                     
            </div>
            <div>
                <h1>
                    {props.user.username}
                </h1>
            </div>
            <div>
                <h1>
                    {props.user.first_name}
                </h1>
            </div>
            <div>
                <h1>
                    {props.user.last_name}
                </h1>
            </div>
            <div>
                <h1>
                    {props.user.email}
                </h1>
            </div>
            <div>
                <Link to='/CreatePlaylist' activeClassName='active'><button>Create Playlist</button></Link>
            </div>
        </div> 
    </div>
    );
}

function mapStateToProps(reduxState){
    return reduxState
}

export default connect(mapStateToProps)(Profile);