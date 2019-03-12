import React, { Component } from "react";
import MyStoriesItem from "./MyStoriesItem"
import { withRouter } from 'react-router-dom';

class MyStoriesList extends Component {

  mapPhotoStories = () => {
    return this.props.photostories.map((photostory, props) =>  {
      return <MyStoriesItem 
                key={photostory.id} 
                history={this.props.history} 
                deletePhotostory={this.props.deletePhotostory} 
                editCaptionInState={this.props.editCaptionInState}photostory={photostory}/>})
  }

  render(){
    return(
      <div>
        {this.mapPhotoStories()}
      </div>
    )
  }
}

export default withRouter(MyStoriesList);
