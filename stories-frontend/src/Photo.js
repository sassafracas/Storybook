import React, { Component } from "react";
import Adapter from "./Adapter"


//map photos here
class Photo extends Component {

  mapPhotos = () => {
    return this.props.photos.map(photo => {return (
      <React.Fragment>
      <li key={photo.id}>{photo.caption}</li>
        <img src={`http://localhost:3000${photo.picture.url}`} height="200" width="400"/>
      </React.Fragment>
        )
      })
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
