import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./comps/layout/Navbar";
import Footer from "./comps/layout/Footer";
import Landing from "./comps/layout/Landing";
import Register from "./comps/auth/Register";
import Login from "./comps/auth/Login";

import "./App.css";

//CHECK FOR TOKEN (token disables when page refreshes)//
if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  //decode token /get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  //call the setCurrentUser Action
  store.dispatch(setCurrentUser(decoded)); //dispatch can call any action
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
              <Footer />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
