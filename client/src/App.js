import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import { Provider } from "react-redux";
import store from "./store";
//Use custom component for private routes
import PrivateRoute from "./comps/common/PrivateRoute";
import Navbar from "./comps/layout/Navbar";
import Footer from "./comps/layout/Footer";
import Landing from "./comps/layout/Landing";
import Register from "./comps/auth/Register";
import Login from "./comps/auth/Login";
import Dashboard from "./comps/dashboard/Dashboard";
import CreateProfile from "./comps/create-profile/CreateProfile";

import "./App.css";

//CHECK FOR TOKEN (token disables when page refreshes) (this needs to be fixed)//
if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  //decode token /get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //call the setCurrentUser Action
  store.dispatch(setCurrentUser(decoded)); //dispatch can call any action

  //check for expired token
  const currentTime = Date.now() / 1000;
  console.log("Current Time:", currentTime);
  console.log("Decoded.exp: ", decoded.exp);
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //Clear the current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      //redux requires a store to provide the data
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="conatiner">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Footer />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
