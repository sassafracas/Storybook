import React, { Component, Fragment } from 'react';
import './App.css';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from "./components/LoginForm"
import Welcome from "./components/Welcome"
import NavBar from "./components/NavBar"
import Adapter from "./components/Adapter"
import RegistrationForm from "./components/RegistrationForm"
import Explore from "./components/Explore"
import MyStoriesList from "./components/MyStoriesList"
import Upload from "./components/Upload"
import PhotoStory from "./components/PhotoStory"

class App extends Component {

  state = {
    username: "",
    password: "",
    currentUserId: "",
    photostories: [],
    errors: ""
  }

  componentDidMount(){
    localStorage.getItem('token') ? Adapter.getCurrentUser(localStorage.getItem('token')).then(r=>r.json()).then(r => this.addTokenInfoToState(r)).then(()=>this.getAllUserStories()) : this.props.history.push("/")
  }

  editCaptionInState = (editedPhoto) => {
    let foundPhotostory = this.props.photostories.find(photostory => photostory.id === editedPhoto.photo_story_id)
    let foundPhotoIndex = foundPhotostory.photos.findIndex((photo, index) => photo.id === editedPhoto.id)
    
    this.setState({
      photostories: [...this.state.photostories, ...foundPhotostory.photos[foundPhotoIndex] = editedPhoto]
    })
  }

  getAllUserStories = () => {
    Adapter.getAllMyStories(localStorage.getItem('token'), this.props.currentUserId)
    .then(r => r.json())
    .then(json => {console.log("getallusers ", json);return json.map(photostory => this.getPhotos(photostory))})
  }

  getPhotos = (photostory) => {
    Adapter.getAllPhotosForStory(photostory.id).then(r => r.json()).then(json => this.addPhotosToState(json, photostory))
  }

  addPhotosToState = (json, photostory) => {
    photostory["photos"] = json
    this.props.addPhotos(photostory)
    console.log("redux photos added", this.props)
  }

  addTokenInfoToState = (r) => {
    this.props.addToken(r)
    console.log("redux props", this.props)
  }
//get delete to delete from store & make sure site doesnt crash after deleting last photo from upload form & fix photo still being in upload box
  deletePhotostory = (photostory) => {
    Adapter.deleteOnePhotostory(photostory.id).then(()=> this.deletePhotostoryFromState(photostory))
  }

  deletePhotostoryFromState = (photostory) => {
    let deletedPhotostoryIndex = this.state.photostories.findIndex((statePhotostory, index) => statePhotostory.id === photostory.id)
    console.log("deleted index ", deletedPhotostoryIndex);
    this.setState({
      photostories: [...this.state.photostories.slice(0, deletedPhotostoryIndex), ...this.state.photostories.slice(deletedPhotostoryIndex+1)]
    }, () => console.log("after deleting state ", this.state))

  }

  clearErrorState = () => {
    this.setState({ errors: ""})
  }

  handleLogInSubmit = (event, username, password) => {
    event.preventDefault()

    fetch(`http://localhost:3000/sessions/`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(r => r.json())
      .then(json => {
        if (json.errors){ this.setState({ errors: json.errors}) } else {
        console.log("handle login submit response ", json);
        this.setState({currentUserId: json.id, username: json.username}, this.setTokenAndPushHistory(json))}
      })
  }

  setTokenAndPushHistory = (json) => {
    localStorage.setItem('token', json.token);
    Adapter.getCurrentUser(localStorage.getItem('token')).then(r=>r.json()).then(r => this.addTokenInfoToState(r)).then(()=>this.getAllUserStories())
    this.props.history.push("/my-stories");
  }

  render() {
    return (
      <div className="App">
        <NavBar routeInfo={this.props} clearErrorState={this.clearErrorState}/>
        <Route exact path="/" component={Welcome} />
          { Adapter.isLoggedIn() ?
            <Fragment>
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/my-stories" component={(props) => <MyStoriesList {...this.props} history={props.history} deletePhotostory={this.deletePhotostory} editCaptionInState={this.editCaptionInState}  />} />
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/my-stories/:id" component={(props) => <PhotoStory {...this.props} history={props.history} editCaptionInState={this.editCaptionInState}  />} />
            </Fragment>
            :
            <Fragment>
               <Redirect to="/"/>
              <Route exact path="/register" component={(props) => <RegistrationForm {...props} />} />
              <Route exact path="/login" component={(props) => <LoginForm {...this.props} {...props} handleLogInSubmit={this.handleLogInSubmit} handleInputChange={this.handleInputChange}/>} />
            </Fragment>
          }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
  password: state.password,
  currentUserId: state.currentUserId,
  photostories: state.photostories,
  errors: state.errors
})

const mapDispatchToProps = dispatch => {
  return {
    addToken: (r) => dispatch({ 
      type: 'ADD_TOKEN',
      payload: {
        currentUserId: r.id,
        username: r.username
      }
    }),
    addPhotos: (photostory) => dispatch({
       type: 'ADD_PHOTOS',
       payload: {
         photostory
       } 
      }),
    reset: () => dispatch({ type: 'RESET' })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
