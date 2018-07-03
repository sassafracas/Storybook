import React, { Component } from "react";
import Adapter from "./Adapter"

class Upload extends Component {

  state = {
    caption: "",
    picture: []
  }
//make caption input a controlled element (will use for future added inputs)
  handlePhotoInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, console.log(this.state))
  }
//post state to database
  handlePhotoUpload = (event) => {
    event.preventDefault();

    console.log("upload event ", event);
    console.log("Before submit state ", this.state)

    //["[[Target]]"].target[1].files
    let formData = new FormData();
    formData.append("caption", this.state.caption)
    formData.append("picture", event.target[1].files[0])
    Adapter.postToPhotos(formData).then(r => r.json()).then(r => console.log(r))
    console.log("handlePhotoUpload ", event.target[1].files[0])
  }

//change state to include picture
  handlePhotoClick = (event) => {
    event.persist()
    console.log("handlePhotoClick before set state", event)
    this.setState({
      picture: event.target.files["0"]
    })
    //["[[Target]]"].target.files["0"]
    //["[[Target]]"].target.files
    console.log("handlePhotoClick ", event.target.files[0])
  }

  render(){
    return(
      <form onSubmit={this.handlePhotoUpload}>
        <h2>Upload A Photo</h2>
        <label>Caption<textarea value={this.state.caption} name="caption" onChange={this.handlePhotoInputChange}></textarea></label>
        <br></br>
        <label>Photo<input type="file" name="picture" accept="image/*"></input></label>
        <input type="submit" value="Upload Your Photo"></input>
      </form>
    )
  }
}

export default Upload;
