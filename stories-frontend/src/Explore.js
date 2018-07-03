import React, { Component } from "react";
import Adapter from "./Adapter"
import PhotoStory from "./PhotoStory"

class Explore extends Component {

  state = {
    allPhotoStories: []
  }

  componentDidMount(){
    Adapter.getAllPhotoStories().then(r => r.json()).then(r => this.addAllPhotoStoriesToState(r))
  }

  addAllPhotoStoriesToState = (photoStoryObjArray) => {
    this.setState({
      allPhotoStories: photoStoryObjArray
    })
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
