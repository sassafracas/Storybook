import React, { Component } from "react";
import Adapter from "./Adapter"


//map photos here
class Photo extends Component {

  mapLargePhotos = () => {
    return this.props.photos.map(photo => {return (
      <React.Fragment>
      <h3 key={photo.id}>{photo.caption}</h3>
        <img src={`http://localhost:3000${photo.picture.url}`} height="400" width="700"/>
      </React.Fragment>
        )
      })
  }

  mapSmallPhotos = () => {
    return this.props.photos.map(photo => {return (
      <React.Fragment>
      <h5 key={photo.id}>{photo.caption}</h5>
        <img src={`http://localhost:3000${photo.picture.url}`} height="200" width="300"/>
      </React.Fragment>
        )
      })
  }

  render() {
    console.log("photo props ", this.props)
    return (
      <div>
        {this.props.routeInfo === `/my-stories/${this.props.photos[0].photo_story_id}` ? this.mapLargePhotos() : this.mapSmallPhotos()}
      </div>
    )
  }
}

export default Photo;
