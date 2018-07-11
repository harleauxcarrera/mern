import React, { Component } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Navbar from './comps/layout/Navbar';
import Footer from './comps/layout/Footer';
import Landing from './comps/layout/Landing';
import Register from './comps/auth/Register';
import Login from './comps/auth/Login';
import "./App.css";

const store = createStore(() => [], {}, applyMiddleware());
class App extends Component {
  render() {
    return (
      //redux requires a store to provide the data
     <Provider store = {store} > 
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
      </Provider>
    )
  }
}

export default App;
