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
    console.log("state", this.state)
    console.log("found photostory", foundPhotostory, foundPhotoIndex)
    this.setState({
      photostories: [...this.state.photostories, ...foundPhotostory.photos[foundPhotoIndex] = editedPhoto]
    }, ()=>{console.log("after", this.state)})
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
  }

  addTokenInfoToState = (r) => {
    this.props.addToken(r)
  }
//make sure site doesnt crash after deleting last photo from upload form & fix photo still being in upload box & change edit function & logout clears store & make sure stories go down alphabetically
  deletePhotostory = (photostory) => {
    Adapter.deleteOnePhotostory(photostory.id).then(()=> this.deletePhotostoryFromState(photostory))
  }

  deletePhotostoryFromState = (photostory) => {
    let deletedPhotostoryIndex = this.props.photostories.findIndex((statePhotostory, index) => statePhotostory.id === photostory.id)
    let newPhotostoryArr = [...this.props.photostories.slice(0, deletedPhotostoryIndex), ...this.props.photostories.slice(deletedPhotostoryIndex+1)]
    this.props.deletePhoto(newPhotostoryArr)
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
        if (json.errors){ this.props.loginErrors(json.errors) } else {
        console.log("handle login submit response ", json);
        this.props.addToken(json) 
        this.setTokenAndPushHistory(json)}
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
    deletePhoto: (newPhotostoryArr) => dispatch({
       type: 'DELETE_STORY',
       payload: {
         photostories : newPhotostoryArr
       } 
      }),
    loginErrors: (errorsJson) => dispatch({
      type: 'ADD_ERRORS',
      payload: {
        errors: errorsJson
      } 
      }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
