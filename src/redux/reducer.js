import axios from 'axios'

const initialState = {
    user: null
}

const GET_USER = 'GET_USER';

export default function reducer(state=initialState, action){
    switch(action.type){
        case GET_USER:
            return {user: action.payload}
        default:
            return state

    }
}


export function getUser(user){
    return {
        payload: user,
        type: GET_USER
    };
}