import React, { Component } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './comps/layout/Navbar';
import Footer from './comps/layout/Footer';
import Landing from './comps/layout/Landing';
import Register from './comps/auth/Register';
import Login from './comps/auth/Login';
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>

      <div className="App">
      <Navbar/>
        <Route exact path = '/' component={Landing}/>
        <div className="conatiner">
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Footer/>
        </div>
      </div>

      </Router>
    )
  }
}

export default App;
