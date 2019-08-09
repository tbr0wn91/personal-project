import React, {Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Profile.scss';

 function Profile(props){
    console.log(props)

    if(!props.user){
        return <></>
    }
    return(
    <div className="profile-container">
        <div className="content">
            <div className='title'>Your Profile:</div>
            <div>
                <img src={props.user.picture} />
                     
            </div>
            <div>
                
                <h1> 
                    
                    <span>Username:</span> {props.user.username}
                </h1>
            </div>
            <div>
                <h1>
                    
                   <span>Name:</span> {props.user.first_name} {props.user.last_name}
                </h1>
               
            </div>
            
            <div>
                <h1> 
                    
                <span>Email:</span> {props.user.email}
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