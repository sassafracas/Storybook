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
import { Form, Input, TextArea, Button, Image, Icon, Message } from 'semantic-ui-react';
import { connect } from "react-redux";

class App extends Component {

  state = {
    username: "",
    password: "",
    currentUserId: "",
    photostories: [],
    errors: "",
    title: "",
    description: "",
    caption: "",
    private: false,
    picture: [],
    formErrors: {title: "", caption: "", picture: []},
    inputPicture: [],
    titleValid: false,
    captionValid: false,
    pictureValid: false,
    formValid: false
  }

  componentDidMount(){
    console.log("is this first");
    localStorage.getItem('token') ? Adapter.getCurrentUser(localStorage.getItem('token')).then(r=>r.json()).then(r => this.addTokenInfoToState(r)).then(()=>this.getAllUserStories()) : this.props.history.push("/")
  }

  editCaptionInState = (editedPhoto) => {
    let foundPhotostory = this.state.photostories.find(photostory => photostory.id === editedPhoto.photo_story_id)
    console.log("found photostory", foundPhotostory);
    let foundPhotoIndex = foundPhotostory.photos.findIndex((photo, index) => photo.id === editedPhoto.id)
    this.setState({
      photostories: [...this.state.photostories, ...foundPhotostory.photos[foundPhotoIndex] = editedPhoto]
    }, () => {
      console.log("after setting state ", this.state.photostories)
    })
    console.log("photo index ", foundPhotoIndex);
    console.log("hi you're editing ", this.state.photostories);
  }


  //make caption & title input a controlled element (will use for future added inputs)
    handlePhotoInputChange = (event, data) => {
      console.log("handle input change ", data);
      this.setState({
        [data.name]: data.value
      }, () => { this.validateField(data.name, data.value) })
    }

    validateField = (fieldName, fieldValue) => {
      let fieldValidationErrors = this.state.formErrors;
      let titleValid = this.state.titleValid
      let captionValid = this.state.captionValid
      let pictureValid = this.state.pictureValid

      switch (fieldName) {
        case 'title':
          titleValid = fieldValue.length >= 1;
          fieldValidationErrors.title = titleValid ? "" : " must be at least one character long";
          break;
        case 'caption':
          captionValid = fieldValue.length >= 1;
          fieldValidationErrors.caption = captionValid ? "" : " must be at least one character long";
          break;
        case 'inputPicture':
          pictureValid = fieldValue.length >= 1;
          fieldValidationErrors.picture = pictureValid ? "" : " must have at least one photo selected";
        default:
          break;
      }
      this.setState({ formErrors: fieldValidationErrors, titleValid, captionValid, pictureValid}, this.validateForm)
    }

    validateForm() {
      this.setState({ formValid: this.state.titleValid && this.state.captionValid && this.state.pictureValid})
    }

    handleRadioButton = (event, value) => {
      event.persist();
      console.log(value);
      this.setState({
        private: value.value
      }, ()=> console.log(this.state))
    }
  //post state to database
    handlePhotoUpload = (event) => {
      event.preventDefault();
      event.persist();

      console.log("upload event ", event);
      console.log("Before submit state ", this.state)

      //["[[Target]]"].target[2].files
      let formData = new FormData();
      formData.append("caption", this.state.caption)
      formData.append("title", this.state.title)
      formData.append("description", this.state.description)
      formData.append("private", this.state.private)
      formData.append("picture", event.target[5].files[0])
      Adapter.postToPhotos(formData)
        .then(r => r.json())
        .then(r => this.putPhotoOnScreen(r))

    }

    photoChange = (event, data) => {
      const name = "inputPicture"
      const value = data.value
      this.setState({
        [name]: value
      }, () => { this.validateField(name, value) })
    }

    putPhotoOnScreen = (photoObj) => {
      console.log("after posting to preview and after uploading to backend", photoObj);
      this.setState({
        caption: "",
        captionValid: false,
        formValid: false,
        picture: [...this.state.picture, photoObj]
      }, ()=> console.log("after setting picture state ", this.state))
    }

    mapPhotoPreviews = () => {
      return this.state.picture.map(picture => <Fragment><Image key={picture.id} src={`http://localhost:3000/${picture.picture.url}`} floated="left" bordered centered size="medium"/><Button color="red" size="mini" compact icon basic attached="right" floated="left" onClick={(event, buttonInfo) => this.deletePhotoFromStateAndBackend(event, buttonInfo, picture)}><Icon name="x"/></Button></Fragment>)
    }

    deletePhotoFromStateAndBackend = (event, buttonInfo, picture) => {
      event.persist();
      console.log(event);
      let deletedPhotoObjIndex = this.state.picture.findIndex((previewPhoto, index) => previewPhoto.id === picture.id)
      console.log("deleted index ", deletedPhotoObjIndex);
      this.setState({
        picture: [...this.state.picture.slice(0, deletedPhotoObjIndex), ...this.state.picture.slice(deletedPhotoObjIndex+1)]
      }, () => Adapter.deletePreviewPhoto(picture.id))
    }

  getAllUserStories = () => {
    console.log("get all user stories ", this.state);
    Adapter.getAllMyStories(localStorage.getItem('token'), this.state.currentUserId)
    .then(r => r.json())
    .then(json => {console.log("getallusers ", json);return json.map(photostory => this.getPhotos(photostory))})
  }

  getPhotos = (photostory) => {
    Adapter.getAllPhotosForStory(photostory.id).then(r => r.json()).then(json => this.addPhotosToState(json, photostory))
  }

  addPhotosToState = (json, photostory) => {
    photostory["photos"] = json
    this.setState({
      photostories: [...this.state.photostories, photostory]
    }, () => console.log("add photos to state ",this.props))

  }

  addTokenInfoToState = (r) => {
    this.setState({
      currentUserId: r.id,
      username: r.username
    }, ()=> console.log("add token info to state ", this.state))
  }

  deletePhotostory = (photostory) => {
    Adapter.deleteOnePhotostory(photostory.id).then(()=> this.deletePhotostoryFromState(photostory))
    console.log(photostory);
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
    console.log("redux ", this.props.hi);
    return (
      <div className="App">
        <NavBar routeInfo={this.props} clearErrorState={this.clearErrorState}/>
        <Route
          exact path="/" component={Welcome} />
          { Adapter.isLoggedIn() ?
            <Fragment>
              <Route
                exact path="/explore"
                component={Explore} />
              <Route
                exact path="/my-stories"
                component={(props) => <MyStories {...this.state}
                                        history={props.history}
                                        deletePhotostory={this.deletePhotostory}
                                        editCaptionInState={this.editCaptionInState}  />} />
              <Route
                exact path="/upload"
                render={() => <Upload {...this.state}
                                        key="upload1"

                                        handlePhotoInputChange={this.handlePhotoInputChange}
                                        validateField={this.validateField}
                                        handleRadioButton={this.handleRadioButton}
                                        handlePhotoUpload={this.handlePhotoUpload}
                                        photoChange={this.photoChange}
                                        putPhotoOnScreen={this.putPhotoOnScreen}
                                        mapPhotoPreviews={this.mapPhotoPreviews} />} />
              <Route
                exact path="/my-stories/:id"
                component={(props) => <PhotoDetails {...this.state}
                                        history={props.history}
                                        editCaptionInState={this.editCaptionInState}  />} />
            </Fragment>
            :
            <Fragment>
               <Redirect to="/"/>
              <Route
                exact path="/register"
                component={(props) => <RegistrationForm {...props} />} />
              <Route
                exact path="/login"
                component={(props) => <LoginForm {...this.state} {...props}
                                        handleLogInSubmit={this.handleLogInSubmit}
                                        handleInputChange={this.handleInputChange}/>} />
            </Fragment>
          }

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hi: "hello"
  }
}


export default withRouter(connect(mapStateToProps)(App));
