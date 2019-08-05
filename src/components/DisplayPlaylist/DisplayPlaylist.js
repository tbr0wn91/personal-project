import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {getUser} from '../../redux/reducer';
import './DisplayPlaylist.scss';
import Songs from '../Songs/Songs';





 class DisplayPlaylist extends Component{
    constructor(props){
        super(props)

        this.state = {
            playlist: [],
            songs: [],
            selected: false,
            playlist_name: ''
        }
        this.getPlaylistInfo = this.getPlaylistInfo.bind(this)
    }
    
    async componentDidMount(){
       if(this.props.user){
        const userPlaylists = await axios.get(`/api/user_playlists?user_id=${this.props.user.user_id}`).then(res => {
            return res.data
        })
        this.setState({
            playlist: userPlaylists
        })
       } 
       else{
         axios.get('/auth/user_session').then(async (res) =>{
            this.props.getUser(res.data);
            const userPlaylists = await axios.get(`/api/user_playlists?user_id=${this.props.user.user_id}`).then(res => {
                return res.data
            })
            this.setState({
                playlist: userPlaylists
            })
          })
       }
    }

    getPlaylistInfo(playlist_id, playlist_name){
        axios.get(`/api/playlist_info/${playlist_id}`).then(songs => {
            this.setState({
                songs: songs.data,
                selected: true,
                playlist_name: playlist_name
            })
        })
    }

    deletePlaylist(id){
        console.log(id)
        axios.delete(`/api/delete_playlist/${id}`).then(playlist => {
            axios.get(`/api/user_playlists/?user_id=${this.props.user.user_id}`).then(playlist => {
                this.setState({
                    playlist: playlist.data
                })
            })
        })
    }


    render(){
        const {songs} = this.state;
        console.log(`state coming from display playlist`,this.state)
        const displayPlaylists = this.state.playlist.map(playlist => {
            return (
                <div>
                    <h1>{playlist.playlist_name}</h1>
                    <button onClick={() => this.getPlaylistInfo(playlist.playlist_id, playlist.playlist_name)}>Select Playlist</button>
                    <button onClick={() => this.deletePlaylist(playlist.playlist_id)}>Delete Playlist</button>
                </div>
            )
        })
        return(
        <div>
           <div className='playlists'>
                {displayPlaylists}
            </div>

            <Songs songs={songs}/>

            <div>
                <Link to="/CreatePlaylist"><button>Go Back</button></Link>
            </div>

        </div>
        )
    }
}


function mapReduxToProps(ReduxState){
    return ReduxState
};

const mapDispatchToProps = {
    getUser
}

 export default withRouter(connect(mapReduxToProps, mapDispatchToProps)(DisplayPlaylist));