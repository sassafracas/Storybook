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

  componentDidMount(){
    localStorage.getItem('token') ? Adapter.getCurrentUser(localStorage.getItem('token')).then(r=>r.json()).then(r => this.addTokenInfoToState(r)).then(()=>this.getAllUserStories()) : this.props.history.push("/")
  }

  editCaptionInState = (editedPhoto) => {
    let foundPhotostory = this.props.photostories.find(photostory => photostory.id === editedPhoto.photo_story_id)
    let foundPhotoIndex = foundPhotostory.photos.findIndex((photo, index) => photo.id === editedPhoto.id)
    let newCaptionPhotostory = [...this.props.photostories, ...foundPhotostory.photos[foundPhotoIndex] = editedPhoto]
    this.props.editCaption(newCaptionPhotostory)
  }

  getAllUserStories = () => {
    Adapter.getAllMyStories(localStorage.getItem('token'), this.props.currentUserId)
    .then(r => r.json())
    .then(json => json.map(photostory => this.getPhotos(photostory)))
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

  deletePhotostory = (photostory) => {
    Adapter.deleteOnePhotostory(photostory.id).then(()=> this.deletePhotostoryFromState(photostory))
  }

  deletePhotostoryFromState = (photostory) => {
    let deletedPhotostoryIndex = this.props.photostories.findIndex((statePhotostory, index) => statePhotostory.id === photostory.id)
    let newPhotostoryArr = [...this.props.photostories.slice(0, deletedPhotostoryIndex), ...this.props.photostories.slice(deletedPhotostoryIndex+1)]
    this.props.deletePhoto(newPhotostoryArr)
  }

  clearStore = () => {
    let clearObj = {
      username: "",
      password: "",
      currentUserId: "",
      photostories: [],
      errors: ""
    }
    this.props.clearStore(clearObj)
  }

  handleLogInSubmit = (event, username, password) => {
    fetch(`https://stories-backend.herokuapp.com/sessions/`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(r => r.json())
      .then(json => {
        if (json.errors){ this.props.loginErrors(json.errors) } else {
        this.props.addToken(json) 
        this.setTokenAndPushHistory(json)}
      })
  }

  setTokenAndPushHistory = (json) => {
    localStorage.setItem('token', json.token);
    Adapter.getCurrentUser(localStorage.getItem('token')).then(r=>r.json()).then(r => this.addTokenInfoToState(r)).then(()=> this.getAllUserStories())
    this.props.history.push("/my-stories");
  }

  render() {
    return (
      <div className="App">
        <NavBar routeInfo={this.props} clearErrorState={this.clearStore}/>
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

const alphabeticalSort = (a,b)=>{
  let nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase()
  if(nameA < nameB) { return -1 }
  if(nameA > nameB) { return 1 }
  return 0
}

const mapStateToProps = state => ({
  username: state.username,
  password: state.password,
  currentUserId: state.currentUserId,
  photostories: state.photostories.sort(alphabeticalSort),
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
    editCaption: (newCaptionPhotostory) => dispatch({
      type: 'EDIT_CAPTION',
      payload: {
        photostories: newCaptionPhotostory
      } 
      }),
    clearStore: (clearObj) => dispatch({
      type: 'CLEAR_STORE',
      payload: {
        clearObj
      } 
      })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
