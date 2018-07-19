//this file containts all actions related to authorization components
//*redux thunk is used here to enable returning functions (dispatch)*//

import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register User
export const registerUser = (userData, history) => dispatch => {
  //when dealing with async data, you must wait for the response
  //redux thunk will help us do just that (and adding "dispatch" inside registerUser ^^)
  axios
    .post("api/users/register", userData) //post  the sign up form
    //here is where we redirect from an action once the user is registered
    .then(res => history.push("/login")) //use hisotry.push to redirect
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //get token
      const { token } = res.data;
      //save token to ls
      localStorage.setItem("jwt-token", token); //this method only stores strings
      //Set token to Auth Header
      setAuthToken(token); //this method in other file
      //decode token to get user data specifically
      const decoded = jwt_decode(token); //stores user data and other metadata
      //Now set the current user
      dispatch(setCurrentUser(decoded));
    })

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user to current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//log user out
export const logoutUser = () => dispatch => {
  //remove the token from local storage
  localStorage.removeItem("jwtToken");
  //remove the auth header for future requests
  setAuthToken(false);
  //Set the current user to empty object which sets isAuthenticated to false
  dispatch(setCurrentUser({}));
};
