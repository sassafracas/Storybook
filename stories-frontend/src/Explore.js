import React, { Component } from "react";
import Adapter from "./Adapter"
import PhotoStory from "./PhotoStory"

class Explore extends Component {

state = {
  allPhotoStories: [],
}

componentDidMount(){
  Adapter.getAllPhotoStories()
  .then(r => r.json())
  .then(json => {return json.map(photostory => this.getPhotos(photostory))})
}

getPhotos = (photostory) => {
  Adapter.getAllPhotosForStory(photostory.id).then(r => r.json()).then(json => this.addPhotosToState(json, photostory))
}

addPhotosToState = (json, photostory) => {
  photostory["photos"] = json
  this.setState({
    allPhotoStories: [...this.state.allPhotoStories, photostory]
  }, () => console.log(this.state))

}

mapAllPhotoStories = () => {
  return this.state.allPhotoStories.map(photostory =>  {return <PhotoStory key={photostory.id} photostory={photostory}/>})
}

render(){
  return(
    <div>
      {this.mapAllPhotoStories()}
    </div>
  )
}
}

export default Explore;
