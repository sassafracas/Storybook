import React, { Component, Fragment } from "react";
import Adapter from "./Adapter"

class Upload extends Component {

  state = {
    title: "",
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
    formData.append("picture", event.target[2].files[0])
    Adapter.postToPhotos(formData).then(r => r.json()).then(r => this.putPhotoOnScreen(r))

  }

  putPhotoOnScreen = (photoObj) => {
    console.log(photoObj.picture.url);
    this.setState({
      picture: [...this.state.picture, photoObj]
    }, ()=> console.log("after setting picture state ", this.state))
  }

//change state to include picture
  handlePhotoClick = (event) => {
    event.persist()
    console.log("handlePhotoClick before set state", event)
    this.setState({
      picture: event.target[2].files["0"]
    })
    //["[[Target]]"].target.files["0"]

    //["[[Target]]"].target.files
    console.log("handlePhotoClick ", event.target.files[0])
  }

  render(){
    return(
      <Fragment>
      <form onSubmit={this.handlePhotoUpload}>
        <h2>Upload A Photo</h2>
        <label>Story Title<input type="text" value={this.state.title} name="title" onChange={this.handlePhotoInputChange}></input></label>
        <br></br>
        <label>Caption<textarea value={this.state.caption} name="caption" onChange={this.handlePhotoInputChange}></textarea></label>
        <br></br>
        <label>Photo<input type="file" name="picture" multiple={true} accept="image/*"></input></label>
        <input type="submit" value="Upload Your Photo"></input>
      </form>
      {this.state.picture[0] ? <img alt="" src={`http://localhost:3000${this.state.picture[0].picture.url}`} height="200" width="300"/> : <h1>Preview of Photos</h1>}
      </Fragment>
    )
  }
}

export default Upload;
