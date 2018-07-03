import React, { Component } from "react";
import Adapter from "./Adapter"
import PhotoStory from "./PhotoStory"

//When I click on a story title, redirects to my-stories/${story.id}
//Renders a PhotoDetails component with photostory & photos
class MyStories extends Component {

  mapPhotoStories = () => {
    return this.props.photostories.map((photostory, props) =>  {return <PhotoStory key={photostory.id} history={this.props.history} deletePhotostory={this.props.deletePhotostory} editCaptionInState={this.props.editCaptionInState}photostory={photostory}/>})
  }

  render(){
    console.log("mystories", this.props);
    return(
      <div>
        {this.mapPhotoStories()}
      </div>
    )
  }
}

export default MyStories;
