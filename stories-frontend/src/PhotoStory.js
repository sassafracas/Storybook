import React, { Component } from "react";
import Adapter from "./Adapter"
import Photo from "./Photo"

class PhotoStory extends Component {

  render() {
   // console.log(this.props.photostory)
    return (
      <ul>
        <li>{this.props.photostory.title}</li>
        <Photo photos={this.props.photostory.photos}/>
      </ul>
    )
  }
}

export default PhotoStory;
