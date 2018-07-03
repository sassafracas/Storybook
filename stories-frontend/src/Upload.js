import React, { Component } from "react";

class Upload extends Component {

  state = {
    title: "",
    caption: "",
  }

  handlePhotoInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, console.log(this.state))
  }

  render(){
    return(
      <form>
        <h2>Upload A Photo</h2>
        <label>Title<input type="text" name="title" value={this.state.title} onChange={this.handlePhotoInputChange}></input></label>
        <br></br>
        <label>Caption<textarea value={this.state.caption} name="caption" onChange={this.handlePhotoInputChange}></textarea></label>
        <br></br>
        <label>Photo<input type="file"></input></label>
        <input type="submit" value="Upload Your Photo"></input>
      </form>
    )
  }
}

export default Upload;
