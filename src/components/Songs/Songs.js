import React, {Component} from 'react';

export default class Songs extends Component{
    constructor(props){
        super(props)

        this.state = {
            
        }
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