import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './DisplayPlaylist.scss'





 class DisplayPlaylist extends Component{
    constructor(props){
        super(props)

        this.state = {
            playlist: []
        }
    }
    
    async componentDidMount(){
        const userPlaylists = await axios.get(`/api/user_playlists?user_id=${this.props.user.user_id}`).then(res => {
            return res.data
        })
        this.setState({
            playlist: userPlaylists
        })
    }


    render(){
        const displayPlaylists = this.state.playlist.map(playlist => {
            return (
                <div>
                    <h1>{playlist.playlist_name}</h1>
                </div>
            )
        })
        return(
        <div>
           <div className='playlists'>
                {displayPlaylists}
            </div>

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

 export default connect(mapReduxToProps)(DisplayPlaylist);