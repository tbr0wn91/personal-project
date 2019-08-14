import React, {Component} from 'react';
import './Songs.scss'


export default class Songs extends Component{
    constructor(props){
        super(props)

        this.state = {
            playlist_name: '',
            
        }
        
    }


    handleChange(value){
        this.setState({
            playlist_name: value
        })
    }

    render(){
        
        const displaySongs = this.props.songs.map(songs => {
            
            return <div className='library-two'>

            <div className="songs">
            <h1>{songs.name}</h1>
            </div>

            <div className='artists'>
            <h1>{songs.artist}</h1>
            </div>

            <div className='audio'>
            <audio controls>
            <source src={songs.audio_file} type="audio/mp3" />
            </audio>
            
            </div>

           

        </div>
                
        })
        return(
            <div className="playlist-container-two">
                <div>
                    <input onChange={(e) => this.handleChange(e.target.value)} value={this.state.playlist_name} type="text" placeholder="playlist name"></input>
                    <button onClick={() => this.props.changePlaylistName(this.state.playlist_name, this.props.playlist_id)}>Change Playlist Name</button>
                </div>
                <div className='playlist-title'>
                    {this.props.playlist_name}
                </div>
                <div className="song-container-two">

                    {displaySongs}
                </div>
            </div>
        )
    }
}