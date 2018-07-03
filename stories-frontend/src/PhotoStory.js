import React, { Component } from "react";
import Adapter from "./Adapter"
import Photo from "./Photo"
import { Link } from 'react-router-dom';

class PhotoStory extends Component {

  deletePhotostory = () => {
    Adapter.deleteOnePhotostory(this.props.photostory.id).then(r => console.log(r))
  }

  render() {
   console.log("photostory props ", this.props)
    return (
      <div>
        <Link to={{
            pathname: `/my-stories/${this.props.photostory.id}`,
            state: {...this.props}
            }}><h4>{this.props.photostory.title}</h4></Link>
          <button onClick={this.deletePhotostory}>Delete Story</button>
          <Photo photos={this.props.photostory.photos}/>
      </div>
    )
  }
}

export default PhotoStory;
