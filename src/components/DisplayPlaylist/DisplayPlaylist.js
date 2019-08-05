import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';




 class DisplayPlaylist extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }
    



    render(){
        return(
            <div></div>
        )
    }
}


function mapReduxToProps(ReduxState){
    return ReduxState
};

 export default connect(mapReduxToProps)(DisplayPlaylist);