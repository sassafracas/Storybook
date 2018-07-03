import React, { Component } from "react";
import Adapter from "./Adapter";
import Photo from "./Photo";
import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

class PhotoStory extends Component {

  render() {
   console.log("photostory props ", this.props)
    return (
      <Segment vertical>
        <Link to={{
            pathname: `/my-stories/${this.props.photostory.id}`,
            state: this.props.photostory
          }}><h3>{this.props.photostory.title}</h3></Link>
        <button onClick={() => this.props.deletePhotostory(this.props.photostory)}>Delete Story</button>
        <Photo photos={this.props.photostory.photos} history={this.props.history} editCaptionInState={this.props.editCaptionInState} />
      </Segment>
    )
  }
}

export default PhotoStory;
