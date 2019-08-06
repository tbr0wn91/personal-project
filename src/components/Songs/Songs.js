import React, {Component} from 'react';


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
            return <div>
                    <h1>{songs.name}</h1>
                    <h1>{songs.artist}</h1>
                 </div>
                
        })
        return(
            <div>
                <div>
                    <input onChange={(e) => this.handleChange(e.target.value)} value={this.state.playlist_name} type="text" placeholder="playlist name"></input>
                    <button onClick={() => this.props.changePlaylistName(this.state.playlist_name, this.props.playlist_id)}>Change Playlist Name</button>
                </div>
                <div>
                    {this.props.playlist_name}
                </div>
                <div>
                    {displaySongs}
                </div>
            </div>
        )
    }
}