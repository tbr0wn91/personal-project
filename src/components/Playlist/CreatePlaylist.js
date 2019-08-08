import React, {Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import {Link } from 'react-router-dom';




import './CreatePlaylist.scss';


 class CreatePlaylist extends Component {
    constructor(props){
        super(props);
        this.state = {
            playlist_name: '',
            name: '',
            artist: '',
            song_id: 0,
            choosing_song: false,
            songs: [],
            playlist: [],
            show: false
        }

        this.createPlaylist = this.createPlaylist.bind(this)
        this.addSong = this.addSong.bind(this)
        this.selectSong = this.selectSong.bind(this)
    }


     async componentDidMount(){
         
       const allSongs = await axios.get(`/api/get_all_songs`).then(res => {
           return res.data
       })
       const userPlaylists = await axios.get(`/api/user_playlists?user_id=${this.props.user.user_id}`).then(res => {
           return res.data
       })

       this.setState({
           songs: allSongs,
           playlist: userPlaylists
       })
    }

    showModal = () => {
        this.setState({
            show: true
        })
    }

    hideModal = () => {
        this.setState({
            show: false
        })
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

     async addSong(){
        const {name, artist} = this.state;
       const songToAdd = await axios.post(`/api/add_song`, {name: name, artist: artist}).then(res => {
           return res.data
       })
        const allSongs = await axios.get(`/api/get_all_songs`).then(res => {
            return res.data
        })
        this.setState({
            songs: allSongs
        })
            
    
    
       
        }

    selectSong(song_id){
        this.setState({
            song_id: song_id,
            choosing_song: true

        })
       
    }

    addSongToPlaylist(playlist_id){
        const {song_id} = this.state;

        axios.post('/api/song_to_playlist', {playlist_id: playlist_id, song_id: song_id}).then(
            () => {
                alert(`Song added!`)
                
                this.setState({
                choosing_song: false
            })
        }
        )
    }



    handlePlaylistName(value){
        this.setState({
            playlist_name: value
        });
    }

    universalChangeHandler(property, value){
        this.setState({
            [property]: value
        })
    }

    render(){
        if (!this.props.user){
            return <></>
        }
        const {artist, name} = this.state;
        console.log('this is state =>',this.state)
        const displaySongs = this.state.songs.map(songs => {
            return(
                
                <div className='library'>

                    <div className="songs">
                    <h1>{songs.name}</h1>
                    </div>

                    <div className='artists'>
                    <h1>{songs.artist}</h1>
                    </div>

                    <div className="addsong-button">
                    <button onClick={() => this.selectSong(songs.song_id)}>+ song</button>
                    </div>

                </div>
                
            )
        
        })
        
        const displayPlaylists = this.state.playlist.map(playlist => {
            return(
                <div className="myplaylists">
                    <h1>{playlist.playlist_name}</h1>
                    <button onClick={() => this.addSongToPlaylist(playlist.playlist_id)}>+ song to playlist</button>
                </div>
            )
        })

        
        return (
        <div className="content-container">
            <div className="input-container">
                <div className='create-playlist'>
                    <input placeholder="playlist name" onChange={(e) => this.handlePlaylistName(e.target.value)} value={this.state.playlist_name} type="text" />
                    <button onClick={this.createPlaylist}>Create Playlist</button>
                </div>

                <div>
                    
                    <input placeholder='artist name' name='artist' type='artist' value={artist} onChange={(e) =>this.universalChangeHandler(e.target.name, e.target.value)}/>
                    <input placeholder='song name' name='name' type='name' value={name} onChange={(e) => this.universalChangeHandler(e.target.name, e.target.value)}/> 
                    <button onClick={this.addSong}>Add Song</button>     
                </div>

                <div>
                    <Link to='/DisplayPlaylist' activeClassName="active"><button>Your Playlists</button></Link>
                </div>
            </div>

            <div className='song-container'>
                <div className='labels'>
                    <span>Song Title</span>
                    <span>Artist</span>
                    <span>Add Song</span>
                </div>

                <div>
                
                        {displaySongs}
                
                    </div>
                    { this.state.choosing_song ?
                    <div className="modal-container">
                        
                        {displayPlaylists}
                        
                    </div>
                    :
                    <div/>
                    }
                
                </div>

            
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