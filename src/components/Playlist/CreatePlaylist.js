import React, {Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import {Link } from 'react-router-dom';


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
            playlist: []
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

    createPlaylist(){
        const {playlist_name} = this.state;
        axios.post(`/api/create_playlist`, {playlist_name: playlist_name, user_id: this.props.user.user_id}).then(res => {
            this.setState({
                playlist_name: res.data,
              user_id: this.props.user.user_id
            })
        })
    }

    addSong(){
        const {name, artist} = this.state;
        axios.post(`/api/add_song`, {name: name, artist: artist}).then(res => {
            this.setState({
                name: res.data,
                artist: res.data
            })
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
            () => alert(`Song added!`)
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
                <div>
                    <h1>{songs.name}</h1>
                    <h1>{songs.artist}</h1>
                    <button onClick={() => this.selectSong(songs.song_id)}>+ song</button>
                </div>
            )
        
        })
        
        const displayPlaylists = this.state.playlist.map(playlist => {
            return(
                <div>
                    <h1>{playlist.playlist_name}</h1>
                    <button onClick={() => this.addSongToPlaylist(playlist.playlist_id)}>+ song to playlist</button>
                </div>
            )
        })

        
        return (
        <div>
            <div>
                <input onChange={(e) => this.handlePlaylistName(e.target.value)} value={this.state.playlist_name} type="text" />
                <button onClick={this.createPlaylist}>Create Playlist</button>
            </div>

            <div>
                Add Song: 
                <input placeholder='artist name' name='artist' type='artist' value={artist} onChange={(e) =>this.universalChangeHandler(e.target.name, e.target.value)}/>
                <input placeholder='song name' name='name' type='name' value={name} onChange={(e) => this.universalChangeHandler(e.target.name, e.target.value)}/> 
                <button onClick={this.addSong}>Add Song</button>     
            </div>
            <div>
            
                {displaySongs}
        
            </div>
            { this.state.choosing_song ?
            <div>
                {displayPlaylists}
            </div>
            :
            <div/>
            }

            <div>
                <Link to='/DisplayPlaylist' activeClassName="active"><button>Your Playlists</button></Link>
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