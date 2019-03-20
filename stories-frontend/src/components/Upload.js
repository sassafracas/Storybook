import React, { Component, Fragment } from "react";
import Adapter from "./Adapter";
import { Form, Input, TextArea, Button, Image, Icon, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Upload extends Component {

  handlePhotoInputChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.props.inputChange(name, value)
    this.validateField(name, value)
  }

  validateField = (fieldName, fieldValue) => {
    let fieldValidationErrors = this.props.formErrors
    let titleValid = this.props.titleValid
    let captionValid = this.props.captionValid
    let pictureValid = this.props.pictureValid

    switch (fieldName) {
      case 'title':
        titleValid = fieldValue.length >= 1;
        fieldValidationErrors.title = titleValid ? "" : "Title must be at least one character long";
        break;
      case 'caption':
        captionValid = fieldValue.length >= 1;
        fieldValidationErrors.caption = captionValid ? "" : "Caption must be at least one character long";
        break;
      case 'inputPicture':
        pictureValid = fieldValue.length >= 1;
        fieldValidationErrors.picture = pictureValid ? "" : "Must have at least one photo selected";
        break;
      default:
        break;
    }
    let errorsObj = { formErrors: fieldValidationErrors, titleValid, captionValid, pictureValid}
    let formValidObj = { formValid: titleValid && captionValid && pictureValid}
    this.props.validateField(errorsObj, formValidObj)
  }

  handleRadioButton = (event, value) => {
    this.props.radioChange(value.value)
  }


  handlePhotoUpload = (event) => {
    let formData = new FormData();
    
    formData.append("caption", this.props.caption)
    formData.append("title", this.props.title)
    formData.append("description", this.props.description)
    formData.append("private", this.props.private)
    formData.append("picture", event.target[5].files[0])
    Adapter.postToPhotos(formData)
      .then(r => r.json())
      .then(r => this.putPhotoOnScreen(r))
    event.target.reset()
  }

  photoChange = (event, data) => {
    const name = "inputPicture"
    const value = data.value
    this.props.photoChange(name, value)
    this.validateField(name, value)
  }

  putPhotoOnScreen = (photoObj) => {
    let newPhotoObj = {
      caption: "",
      captionValid: false,
      formValid: false,
      picture: [...this.props.picture, photoObj]
    }
    let uploadedPhotostory = {
      description: photoObj.photostory_description.description || "",
      id: photoObj.photostory_id,
      photos: [...this.props.uploadedPhotostory.photos || [], {caption: photoObj.caption, id: photoObj.id, photo_story_id: photoObj.photostory_id, picture: photoObj.picture}],
      private: photoObj.photostory_private,
      title: photoObj.photostory_title,
      user_id: photoObj.photostory_user_id
    }
    this.props.photoDisplay(newPhotoObj)
    this.props.updatePhotostories(uploadedPhotostory)
  }

  deletePhotoFromStore = (newPhotoArr)=> {
    let newArr = []
    newPhotoArr.forEach((obj)=>{
      newArr.push({
          caption: obj.caption, 
          id: obj.id, 
          photo_story_id: obj.photostory_id, 
          picture: obj.picture
      })
    })

    this.props.deletePhotoFromUploaded(newArr)
  }

  mapPhotoPreviews = () => {
    return this.props.picture.map(picture => 
    <Fragment key={picture.id}>
      <Image key={picture.id} src={`http://localhost:3000/${picture.picture.url}`} floated="left" bordered centered size="medium"/>
      <Button color="red" size="mini" compact icon basic attached="right" floated="left" onClick={(event, buttonInfo) => this.deletePhotoFromStateAndBackend(event, buttonInfo, picture)}><Icon name="x"/></Button>
    </Fragment>)
  }

  deletePhotoFromStateAndBackend = (event, buttonInfo, picture) => {
    let deletedPhotoObjIndex = this.props.picture.findIndex((previewPhoto, index) => previewPhoto.id === picture.id)
    let newPhotoArr = [...this.props.picture.slice(0, deletedPhotoObjIndex), ...this.props.picture.slice(deletedPhotoObjIndex+1)]

    if (newPhotoArr.length > 0){
      this.props.deletePhoto(newPhotoArr)
      this.deletePhotoFromStore(newPhotoArr)
      Adapter.deletePreviewPhoto(picture.id)
    } else {
      Adapter.deletePreviewPhoto(picture.id)
      let clearFormObj = {
        title: "",
        description: "",
        caption: "",
        picture: [],
        inputPicture: [],
        uploadedPhotostory: {}
      }
      this.props.clearForm(clearFormObj)
    }
  }

  updatePhotostoriesStore = () => {
    let clearFormObj = {
      title: "",
      description: "",
      caption: "",
      picture: [],
      inputPicture: [],
      uploadedPhotostory: {}
    }
    this.props.addPhotostoryToStore()
    this.props.clearForm(clearFormObj)
  }

  render(){
    return(
      <Fragment>
        <Form className='form' error onSubmit={this.handlePhotoUpload}>
          <h2>Upload A Photo</h2>
          <Form.Field required error={!this.props.titleValid}>
            <label>Story Title</label>
            <Input
              type="text"
              value={this.props.title}
              name="title" placeholder="Story Title"
              onChange={this.handlePhotoInputChange}/>
          </Form.Field>
          {this.props.formErrors.title ? <Message error content={this.props.formErrors.title}/> : "" }
          <Form.Field>
            <label>Story Description</label>
            <TextArea
              type="text"
              value={this.props.description}
              name="description"
              placeholder="Story Text"
              onChange={this.handlePhotoInputChange}/>
          </Form.Field>
          <Form.Field required error={!this.props.captionValid}>
            <label>Caption</label>
            <TextArea
              value={this.props.caption}
              name="caption"
              placeholder="Photo Caption"
              onChange={this.handlePhotoInputChange}/>
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
              />
          </Form.Field>
          <Form.Field>
            <Button type="submit" disabled={!this.props.formValid}>Upload Your Photo</Button>
          </Form.Field>
        </Form>
        {this.props.picture[0] ? <div className='form__picture-preview'>{this.mapPhotoPreviews()} <Button positive floated='right' onClick={this.updatePhotostoriesStore}>Done</Button></div> : <h4>Preview of Photos</h4>}
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
  formValid: state.formValid,
  uploadedPhotostory: state.uploadedPhotostory
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
    photoDisplay: (newPhotoObj) => dispatch({ 
      type: 'PHOTO_DISPLAY',
      payload: {
        newPhotoObj
      }
    }),
    radioChange: (value) => dispatch({ 
      type: 'RADIO_CHANGE',
      payload: {
        private: value
      }
    }),
    deletePhoto: (newPhotoArr) => dispatch({ 
      type: 'DELETE_PHOTO',
      payload: {
        picture: newPhotoArr
      }
    }),
    validateField: (errorsObj, formValidObj) => dispatch({ 
      type: 'VALIDATE_FIELD',
      payload: {
        ...errorsObj,
        ...formValidObj
      }
    }),
    updatePhotostories: (uploadedPhotostory) => dispatch({ 
      type: 'UPDATE_PHOTOSTORIES',
      payload: {
        ...uploadedPhotostory
      }
    }),
    addPhotostoryToStore: () => dispatch({ 
      type: 'ADD_PHOTOSTORY'
    }),
    clearForm: (clearFormObj) => dispatch({ 
      type: 'CLEAR_FORM',
      payload: {
        ...clearFormObj
      }
    }),
    deletePhotoFromUploaded: (uploadedPhotostory) => dispatch({ 
      type: 'DELETE_UPLOADED',
      payload: {
        photos: uploadedPhotostory
      }
    })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Upload));
