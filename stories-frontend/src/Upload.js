import React, { Component, Fragment } from "react";
import Adapter from "./Adapter";
import { Form, Input, TextArea, Button, Image, Icon, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Upload extends Component {

  state = {
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
//make caption & title input a controlled element (will use for future added inputs)
  handlePhotoInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    }, () => { this.validateField(name, value) })
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
      .then(r => this.putPhotoOnScreen(r.photo, r.photostory))

  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("the props now", this.props);
    console.log("update props ", nextProps);
    console.log("update state", nextState);
    let shouldUpdate = this.props.editUploadedPhotoInState === nextProps.editUploadedPhotoInState
    return shouldUpdate

  }

  photoChange = (event, data) => {
    const name = "inputPicture"
    const value = data.value
    this.setState({
      [name]: value
    }, () => { this.validateField(name, value) })
  }

  putPhotoOnScreen = (photoObj, photostoryObj) => {
    console.log("after posting to preview and after uploading to backend", this.state);
    console.log(photoObj);
    this.setState({
      caption: "",
      captionValid: false,
      formValid: false,
      picture: [...this.state.picture, photoObj]
    }, ()=> {console.log("after setting state", this.state); return this.props.editUploadedPhotoInState(photoObj, photostoryObj)})
  }

//change state to include picture
  handlePhotoClick = (event) => {
    event.persist()
    console.log("handlePhotoClick before set state", event)
    this.setState({
      picture: event.target[3].files["0"]
    })
    //["[[Target]]"].target.files["0"]

    //["[[Target]]"].target.files
    console.log("handlePhotoClick ", event.target.files[0])
  }

  mapPhotoPreviews = () => {
    return this.state.picture.map(picture => <Fragment key={picture.id}><Image key={picture.id} src={`http://localhost:3000/${picture.picture.url}`} floated="left" bordered centered size="medium"/><Button color="red" size="mini" compact icon basic attached="right" floated="left" onClick={(event, buttonInfo) => this.deletePhotoFromStateAndBackend(event, buttonInfo, picture)}><Icon name="x"/></Button></Fragment>)
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

  render(){
      console.log("upload render")
    return(
      <Fragment>
      <Form onSubmit={this.handlePhotoUpload}>
        <h2>Upload A Photo</h2>
        <Form.Field required error={!this.state.titleValid}>
          <label>Story Title</label>
          <Input
            type="text"
            value={this.state.title}
            name="title" placeholder="Story Title"
            onChange={this.handlePhotoInputChange}></Input>
        </Form.Field>
        <Form.Field>
          <label>Story Description</label>
          <TextArea
            type="text"
            value={this.state.description}
            name="description"
            placeholder="Story Text"
            onChange={this.handlePhotoInputChange}></TextArea>
        </Form.Field>
        <Form.Field required error={!this.state.captionValid}>
          <label>Caption</label>
          <TextArea
            value={this.state.caption}
            name="caption"
            placeholder="Photo Caption"
            onChange={this.handlePhotoInputChange}></TextArea>
        </Form.Field>
        {this.state.formErrors.caption ? <Message error header={this.state.formErrors.caption}/> : "" }
        <Form.Group inline>
        <Form.Radio
            label='Private'
            value={true}
            checked={this.state.private === true}
            onChange={this.handleRadioButton}
          />
          <Form.Radio
            label='Public'
            value={false}
            checked={this.state.private === false}
            onChange={this.handleRadioButton}
          />
        </Form.Group>
        <Form.Field required error={!this.state.pictureValid}>
          <label>Photo</label>
          <Input
            type="file"
            name="picture"
            multiple={true}
            accept="image/*"
            onChange={(event, data) => this.photoChange(event, data)}
            ></Input>
        </Form.Field>
        <Form.Field>
          <Button type="submit" disabled={!this.state.formValid}>Upload Your Photo</Button>
        </Form.Field>
      </Form>
      {this.state.picture[0] ? this.mapPhotoPreviews() : <h4>Preview of Photos</h4>}
      </Fragment>
    )
  }
}

export default withRouter(Upload);
