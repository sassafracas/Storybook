import React, { Component } from "react";

class PhotoDetails extends Component {

  // mapPhotos = () => {
  //   return this.props.locaiton.state.photostory.photos.map(photoobj => {return <P})
  // }

  render(){
    console.log(this.props.location.state)
    return(
      <h1>{this.props.location.state.photostory.title}</h1>
      // {this.mapPhotos()}
    )
  }

}

export default PhotoDetails;
