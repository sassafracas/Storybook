import React, { Component } from "react";
import Adapter from "./Adapter"


//map photos here
class Photo extends Component {

  mapPhotos = () => {
    return this.props.photos.map(photo => <li key={photo.id}>{photo.caption}</li>)
  }
  render() {
    // console.log(this.props)
    return (
      <ul>
        {this.mapPhotos()}
      </ul>
    )
  }
}

export default Photo;
