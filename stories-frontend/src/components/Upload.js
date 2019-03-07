import React, { Component, Fragment } from "react";
import Adapter from "./Adapter";
import { Form, Input, TextArea, Button, Image, Icon, Message, StepTitle } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Upload extends Component {

//make caption & title input a controlled element (will use for future added inputs)
  handlePhotoInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.props.inputChange(name, value)
    this.validateField(name, value)
    console.log("redux form change", this.props)
  }

  validateField = (fieldName, fieldValue) => {
    let fieldValidationErrors = this.props.formErrors
    let titleValid = this.props.titleValid
    let captionValid = this.props.captionValid
    let pictureValid = this.props.pictureValid
    console.log(fieldName, fieldValue)
    switch (fieldName) {
      case 'title':
        titleValid = fieldValue.length >= 1;
        console.log("this is true?", titleValid)
        fieldValidationErrors.title = titleValid ? "" : "Title must be at least one character long";
        break;
      case 'caption':
        captionValid = fieldValue.length >= 1;
        fieldValidationErrors.caption = captionValid ? "" : "Caption must be at least one character long";
        break;
      case 'inputPicture':
        pictureValid = fieldValue.length >= 1;
        fieldValidationErrors.picture = pictureValid ? "" : "Must have at least one photo selected";
      default:
        break;
    }
    let errorsObj = { formErrors: fieldValidationErrors, titleValid, captionValid, pictureValid}
    console.log("in errors", errorsObj)
    this.props.validateField(errorsObj)
    this.validateForm()
  }

  validateForm = () => {
    this.props.validateForm({ formValid: this.props.titleValid && this.props.captionValid && this.props.pictureValid})
  }

  handleRadioButton = (event, value) => {
    console.log(value);
    this.props.radioChange(value.value)
  }
//post state to database
  handlePhotoUpload = (event) => {
    event.preventDefault();

    //["[[Target]]"].target[2].files
    let formData = new FormData();
    formData.append("caption", this.props.caption)
    formData.append("title", this.props.title)
    formData.append("description", this.props.description)
    formData.append("private", this.props.private)
    formData.append("picture", event.target[5].files[0])
    Adapter.postToPhotos(formData)
      .then(r => r.json())
      .then(r => this.putPhotoOnScreen(r))

  }

  photoChange = (event, data) => {
    const name = "inputPicture"
    const value = data.value
    console.log("data", data.value)
    this.props.photoChange(name, value)
    this.validateField(name, value)
  }

  putPhotoOnScreen = (photoObj) => {
    this.props.photoDisplay(photoObj)
  }

//change state to include picture
  // handlePhotoClick = (event) => {
  //   event.persist()
  //   console.log("handlePhotoClick before set state", event)

  //   this.setState({
  //     picture: event.target[3].files["0"]
  //   })
  //   //["[[Target]]"].target.files["0"]

  //   //["[[Target]]"].target.files
  //   console.log("handlePhotoClick ", event.target.files[0])
  // }

  mapPhotoPreviews = () => {
    return this.props.picture.map(picture => <Fragment><Image key={picture.id} src={`http://localhost:3000/${picture.picture.url}`} floated="left" bordered centered size="medium"/><Button color="red" size="mini" compact icon basic attached="right" floated="left" onClick={(event, buttonInfo) => this.deletePhotoFromStateAndBackend(event, buttonInfo, picture)}><Icon name="x"/></Button></Fragment>)
  }

  deletePhotoFromStateAndBackend = (event, buttonInfo, picture) => {
    event.persist();
    console.log(event);
    let deletedPhotoObjIndex = this.props.picture.findIndex((previewPhoto, index) => previewPhoto.id === picture.id)
    this.props.deletePhoto(deletedPhotoObjIndex)
    Adapter.deletePreviewPhoto(picture.id)
  }

  render(){
    return(
      <Fragment>
      <Form error onSubmit={this.handlePhotoUpload}>
        <h2>Upload A Photo</h2>
        <Form.Field required error={!this.props.titleValid}>
          <label>Story Title</label>
          <Input
            type="text"
            value={this.props.title}
            name="title" placeholder="Story Title"
            onChange={this.handlePhotoInputChange}></Input>
        </Form.Field>
        {this.props.formErrors.title ? <Message error content={this.props.formErrors.title}/> : "" }
        <Form.Field>
          <label>Story Description</label>
          <TextArea
            type="text"
            value={this.props.description}
            name="description"
            placeholder="Story Text"
            onChange={this.handlePhotoInputChange}></TextArea>
        </Form.Field>
        <Form.Field required error={!this.props.captionValid}>
          <label>Caption</label>
          <TextArea
            value={this.props.caption}
            name="caption"
            placeholder="Photo Caption"
            onChange={this.handlePhotoInputChange}></TextArea>
        </Form.Field>
        {this.props.formErrors.caption ? <Message error content={this.props.formErrors.caption}/> : "" }
        <Form.Group inline>
        <Form.Radio
            label='Private'
            value={true}
            checked={this.props.private === true}
            onChange={this.handleRadioButton}
          />
          <Form.Radio
            label='Public'
            value={false}
            checked={this.props.private === false}
            onChange={this.handleRadioButton}
          />
        </Form.Group>
        <Form.Field required error={!this.props.pictureValid}>
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
          <Button type="submit" disabled={!this.props.formValid}>Upload Your Photo</Button>
        </Form.Field>
      </Form>
      {this.props.picture[0] ? this.mapPhotoPreviews() : <h4>Preview of Photos</h4>}
      </Fragment>
    )
  }
}
const mapStateToProps = state => ({
  title: state.title,
  description: state.description,
  caption: state.caption,
  private: state.private,
  picture: state.picture,
  formErrors: state.formErrors,
  inputPicture: state.inputPicture,
  titleValid: state.titleValid,
  captionValid: state.captionValid,
  pictureValid: state.pictureValid,
  formValid: state.formValid
})

const mapDispatchToProps = dispatch => {
  return {
    inputChange: (name, value) => dispatch({ 
      type: 'INPUT_CHANGE',
      payload: {
        [name]: value
      }
    }),
    errorChange: (name, value) => dispatch({ 
      type: 'ERROR_CHANGE',
      payload: {
        [name]: value
      }
    }),
    photoChange: (name, value) => dispatch({ 
      type: 'PHOTO_CHANGE',
      payload: {
        [name]: value
      }
    }),
    photoDisplay: (photoObj) => dispatch({ 
      type: 'PHOTO_DISPLAY',
      payload: {
        caption: "",
        captionValid: false,
        formValid: false,
        picture: [...this.props.picture, photoObj]
      }
    }),
    radioChange: (value) => dispatch({ 
      type: 'RADIO_CHANGE',
      payload: {
        private: value
      }
    }),
    deletePhoto: (deletedPhotoObjIndex) => dispatch({ 
      type: 'DELETE_PHOTO',
      payload: {
        picture: [...this.props.picture.slice(0, deletedPhotoObjIndex), ...this.props.picture.slice(deletedPhotoObjIndex+1)]
      }
    }),
    validateField: (errorsObj) => dispatch({ 
      type: 'VALIDATE_FIELD',
      payload: {
        errorsObj
      }
    }),
    validateForm: (formValidObj) => dispatch({ 
      type: 'VALIDATE_FORM',
      payload: {
        formValidObj
      }
    }),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Upload));
