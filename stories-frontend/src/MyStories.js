import React, { Component } from "react";
import Adapter from "./Adapter"
import PhotoStory from "./PhotoStory"

//When I click on a story title, redirects to my-stories/${story.id}
//Renders a PhotoDetails component with photostory & photos
class MyStories extends Component {

  state = {
    photostories: [],
  }

  componentDidMount(){
    Adapter.getAllMyStories(localStorage.getItem('token'))
    .then(r => r.json())
    .then(json => {return json.map(photostory => this.getPhotos(photostory))})
  }

  getPhotos = (photostory) => {
    Adapter.getAllPhotosForStory(photostory.id).then(r => r.json()).then(json => this.addPhotosToState(json, photostory))
  }

  addPhotosToState = (json, photostory) => {
    photostory["photos"] = json
    this.setState({
      photostories: [...this.state.photostories, photostory]
    }, () => console.log("mystories ",this.props))

  }

  mapPhotoStories = () => {
    return this.state.photostories.map(photostory =>  {return <PhotoStory key={photostory.id} photostory={photostory}/>})
  }

  render(){
    return(
      <div>
        {this.mapPhotoStories()}
      </div>
    )
  }
}

export default MyStories;
