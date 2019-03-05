import React, { Component } from "react";
import Adapter from "./Adapter"
import MyStoriesItem from "./MyStoriesItem"
import { withRouter } from 'react-router-dom';
//When I click on a story title, redirects to my-stories/${story.id}
//Renders a PhotoDetails component with photostory & photos
class MyStoriesList extends Component {

  mapPhotoStories = () => {
    return this.props.photostories.map((photostory, props) =>  {return <MyStoriesItem key={photostory.id} history={this.props.history} deletePhotostory={this.props.deletePhotostory} editCaptionInState={this.props.editCaptionInState}photostory={photostory}/>})
  }

  render(){
    console.log("mystorieslist", this.props);
    return(
      <div>
        {this.mapPhotoStories()}
      </div>
    )
  }
}

export default withRouter(MyStoriesList);
