import React, { Component, Fragment } from 'react';
import './App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import LoginForm from "./LoginForm"
import Welcome from "./Welcome"
import NavBar from "./NavBar"
import Adapter from "./Adapter"
import RegistrationForm from "./RegistrationForm"
import Explore from "./Explore"
import MyStories from "./MyStories"
import Upload from "./Upload"
import PhotoDetails from "./PhotoDetails"

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Welcome} />
          { Adapter.isLoggedIn() ?
            <Switch>
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/my-stories" component={MyStories} />
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/my-stories/:id" component={PhotoDetails} />
            </Switch>
            :
            <Switch>
              <Redirect to="/" />
              <Route exact path="/register" component={(props) => <RegistrationForm {...props} />} />
              <Route exact path="/login" component={(props) => <LoginForm {...props} />} />
            </Switch>
          }

      </div>
    );
  }
}

export default withRouter(App);
