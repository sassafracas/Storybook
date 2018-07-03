import React, { Component } from "react";
import Adapter from "./Adapter";
import Photo from "./Photo";
import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

class PhotoStory extends Component {

  deletePhotostory = () => {
    Adapter.deleteOnePhotostory(this.props.photostory.id).then(r => console.log(r))
  }

  render() {
   console.log("photostory props ", this.props)
    return (
      <Segment vertical>
        <Link to={{
            pathname: `/my-stories/${this.props.photostory.id}`,
            state: {...this.props}
          }}><h3>{this.props.photostory.title}</h3></Link>
          <button onClick={this.deletePhotostory}>Delete Story</button>
          <Photo photos={this.props.photostory.photos}/>
      </Segment>
    )
  }
}

export default PhotoStory;
