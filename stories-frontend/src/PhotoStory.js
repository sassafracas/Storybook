import React, { Component } from "react";
import Adapter from "./Adapter"
import Photo from "./Photo"
import { Link } from 'react-router-dom';

class PhotoStory extends Component {

  render() {
   console.log("photostory props ", this.props)
    return (
      <ul>
        <Link to={{
            pathname: `/my-stories/${this.props.photostory.id}`,
            state: {...this.props}
            }}><li><h4>{this.props.photostory.title}</h4></li></Link>
          <Photo photos={this.props.photostory.photos}/>
      </ul>
    )
  }
}

export default PhotoStory;
