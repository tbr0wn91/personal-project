import React, {Component} from 'react';
import axios from 'axios';

export default class Songs extends Component{
    constructor(props){
        super(props)

        this.state = {
            playlist_name: ''
        }
    }

    changeName(){
        axios.put(`/api/update_playlist_name`, {playlist_name: playlist_name})
    }


    render(){
        console.log( `these are the songs`,this.props)
        const displaySongs = this.props.songs.map(songs => {
            return <div>
                    <h1>{songs.name}</h1>
                    <h1>{songs.artist}</h1>
                 </div>
                
        })
        return(
            <div>
                <div>
                    {displaySongs}
                </div>
            </div>
        )
    }
}