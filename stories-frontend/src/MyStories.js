import React, { Component } from "react";
import Adapter from "./Adapter"
import PhotoStory from "./PhotoStory"

//When I click on a story title, redirects to my-stories/${story.id}
//Renders a PhotoDetails component with photostory & photos
class MyStories extends Component {

  mapPhotoStories = () => {
    return this.props.photostories.map(photostory =>  {return <PhotoStory key={photostory.id} photostory={photostory}/>})
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
