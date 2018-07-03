import React, { Component } from "react";
import Photo from "./Photo"
class PhotoDetails extends Component {


  render(){
    console.log("inside photodetails ",this.props)
    return(
      <div>
      <h1>{this.props.location.state.photostory.title}</h1>
      <Photo routeInfo={this.props.location.pathname} photos={this.props.location.state.photostory.photos} />
      </div>
    )
  }

}

export default PhotoDetails;
