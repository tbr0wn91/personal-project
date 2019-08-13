import React from 'react';
import DisplayPlaylist from '../DisplayPlaylist/DisplayPlaylist';
import {getUser} from '../../redux/reducer';
import {connect} from 'react-redux';


function Checkuser(props){

    if (!props.user){
        return <></>
    }
    else return <div>
        <DisplayPlaylist />
                </div>
 

}


function mapReduxToProps(ReduxState){
    return ReduxState
};

const mapDispatchToProps = {
    getUser
}

 export default (connect(mapReduxToProps, mapDispatchToProps)(Checkuser));