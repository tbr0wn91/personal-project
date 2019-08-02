import React, {Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

 class CreatePlaylist extends Component {
    constructor(props){
        super(props);
        this.state = {
            playlist_name: ''
        }

        this.createPlaylist = this.createPlaylist.bind(this)
    }




    createPlaylist(){
        const {playlist_name} = this.state;
        axios.post(`/api/create_playlist`, {playlist_name: playlist_name, user_id: this.props.user.user_id}).then(res => {
            this.setState({
                playlist_name: res.data,
              user_id: this.props.user.user_id
            })
        })
    }

    handlePlaylistName(value){
        this.setState({
            playlist_name: value
        });
    }

    render(){
        console.log(`this is props from redux`, this.props)
        console.log(`this is the playlist object`, this.state)
        return (
        <div>
            <div>CreatePlaylist</div>
            <input onChange={(e) => this.handlePlaylistName(e.target.value)} value={this.state.playlist_name} type="text" />
            <button onClick={this.createPlaylist}>Add Music!</button>
        </div>
        )
    }
}


function mapReduxToProps(reduxState){
    return reduxState;
};

const mapDispatchToProps = {
    getUser
};

const connectInvoked = connect(
    mapReduxToProps,
    mapDispatchToProps
);

export default connectInvoked(CreatePlaylist);