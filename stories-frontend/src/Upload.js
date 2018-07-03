import React, { Component, Fragment } from "react";
import Adapter from "./Adapter";
import { Form, Input, TextArea, Button, Image } from 'semantic-ui-react';

class Upload extends Component {

  state = {
    title: "",
    description: "",
    caption: "",
    picture: []
  }
//make caption & title input a controlled element (will use for future added inputs)
  handlePhotoInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, console.log(this.state))
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
    formData.append("picture", event.target[3].files[0])
    Adapter.postToPhotos(formData).then(r => r.json()).then(r => this.putPhotoOnScreen(r))

  }

  putPhotoOnScreen = (photoObj) => {
    console.log(photoObj.picture.url);
    this.setState({
      caption: "",
      picture: [...this.state.picture, photoObj]
    }, ()=> console.log("after setting picture state ", this.state))
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
    return this.state.picture.map(picture => <Image src={`http://localhost:3000/${picture.picture.url}`} floated="left" bordered centered size="medium"/>)
  }

  render(){
    return(
      <Fragment>
      <Form onSubmit={this.handlePhotoUpload}>
        <h2>Upload A Photo</h2>
        <Form.Field required>
          <label>Story Title</label>
          <Input type="text" value={this.state.title} name="title" placeholder="Story Title" onChange={this.handlePhotoInputChange}></Input>
        </Form.Field>
        <Form.Field>
          <label>Story Description</label>
          <TextArea type="text" value={this.state.description} name="description" placeholder="Story Text" onChange={this.handlePhotoInputChange}></TextArea>
        </Form.Field>
        <Form.Field required>
          <label>Caption</label>
          <TextArea value={this.state.caption} name="caption" placeholder="Photo Caption" onChange={this.handlePhotoInputChange}></TextArea>
        </Form.Field>
        <Form.Field required>
          <label>Photo</label>
          <Input type="file" name="picture" multiple={true} accept="image/*"></Input>
        </Form.Field>
        <Form.Field>
          <Button type="submit">Upload Your Photo</Button>
        </Form.Field>
      </Form>
      {this.state.picture[0] ? this.mapPhotoPreviews() : <h4>Preview of Photos</h4>}
      </Fragment>
    )
  }
}

export default Upload;
