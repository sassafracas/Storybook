import React, { Component } from "react";
import Adapter from "./Adapter"
import MyStoriesItem from "./MyStoriesItem"

class Explore extends Component {

state = {
  allPhotoStories: [],
}

componentDidMount(){
  Adapter.getAllPublicPhotoStories()
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
  })

}

alphabeticalSort = (a,b) => {
  let nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase()
    if(nameA < nameB) { return -1 }
    if(nameA > nameB) { return 1 }
    return 0
}

mapAllPhotoStories = () => {
  return this.state.allPhotoStories.sort(this.alphabeticalSort).map(photostory =>  {return <MyStoriesItem key={photostory.id} photostory={photostory}/>})
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
