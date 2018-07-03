import React, { Component } from "react";
import Adapter from "./Adapter"


//map photos here
class Photo extends Component {

  mapLargePhotos = () => {
    return this.props.photos.map(photo => {return (
      <React.Fragment>
      <li key={photo.id}>{photo.caption}</li>
        <img src={`http://localhost:3000${photo.picture.url}`} height="400" width="700"/>
      </React.Fragment>
        )
      })
  }

  mapSmallPhotos = () => {
    return this.props.photos.map(photo => {return (
      <React.Fragment>
      <li key={photo.id}>{photo.caption}</li>
        <img src={`http://localhost:3000${photo.picture.url}`} height="200" width="300"/>
      </React.Fragment>
        )
      })
  }

  render() {
    console.log("photo props ", this.props)
    return (
      <ul>
        {this.props.routeInfo === `/my-stories/${this.props.photos[0].photo_story_id}` ? this.mapLargePhotos() : this.mapSmallPhotos()}
      </ul>
    )
  }
}

export default Photo;
