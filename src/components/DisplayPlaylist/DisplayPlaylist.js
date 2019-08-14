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
            playlist_name: '',
            playlist_id: 0
        }
        this.getPlaylistInfo = this.getPlaylistInfo.bind(this)
        this.changePlaylistName = this.changePlaylistName.bind(this)
    }
    
    
    async componentDidMount(){
        
        const userPlaylists = await axios.get(`/api/user_playlists?user_id=${this.props.user.user_id}`).then(res => {
            return res.data
        })
        this.setState({
            playlist: userPlaylists
        })
    
      
       
    }

     async changePlaylistName(playlist_name, playlist_id){
         
       const newPlaylist = await axios.put(`/api/update_playlist_name/${this.props.user.user_id}`, {playlist_name: playlist_name, playlist_id: playlist_id}).then(res => {
            return res.data    
        }) 
        const songName = await axios.get(`/api/playlist_info/${playlist_id}`).then(res => {
            return res.data
        })
        console.log(`this is the new playlist `, newPlaylist)
        this.setState({
            playlist_name: songName[0].playlist_name,
            playlist: newPlaylist
        })
    }
       

    getPlaylistInfo(playlist_id, playlist_name){
        axios.get(`/api/playlist_info/${playlist_id}`).then(songs => {
            this.setState({
                songs: songs.data,
                selected: true,
                playlist_name: playlist_name,
                playlist_id: playlist_id
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
        if (!this.props.user){
            return <></>
        }
        const {songs,playlist_id, playlist_name} = this.state;
        console.log(`state coming from display playlist`,this.state)
        const displayPlaylists = this.state.playlist.map(playlist => {
            return (
                <div className='display-container'>
                    <h1>{playlist.playlist_name}</h1>
                    <button onClick={() => this.getPlaylistInfo(playlist.playlist_id, playlist.playlist_name)}>Select Playlist</button>
                    <button onClick={() => this.deletePlaylist(playlist.playlist_id)}>Delete Playlist</button>
                </div>
            )
        })

        
        return(
        <body>
            <div className='display-container'>
                <div className='container-child'>
                <div className='playlists'>
                        {displayPlaylists}
                    </div>

                    <div className="playlist-info">
                    <Songs songs={songs} playlist_id={playlist_id} changePlaylistName={this.changePlaylistName} playlist_name={playlist_name}/>
                    </div>

                    <div>
                        <Link to="/CreatePlaylist"><button>Go Back</button></Link>
                    </div>

                </div>
            </div>
            
        </body>
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