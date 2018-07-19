//axios defaults sets a default header (the auth token)
import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //apply token to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //delete the auth header if there is one there already
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
