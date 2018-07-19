//*redux thunk is used here to enable returning functions (dispatch)*//

import { GET_ERRORS } from "./types";
//for http requests
import axios from 'axios';

//Register User Action called Register.js Form is submitted
export const registerUser = (userData, history) => dispatch => {
  //when dealing with async data, you must wait for the response
  //redux thunk will help us do just that (and adding "dispatch" inside registerUser ^^)
axios
    .post('api/users/register', userData)//post  the sign up form
    //here is where we redirect from an action once the user is registered
    .then( res => history.push('/login'))//use hisotry.push to redirect
    .catch(err => 
      dispatch({
        type: GET_ERRORS, 
        payload: err.response.data
      }))
     
}