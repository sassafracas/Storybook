import React, { Component } from "react";
import Adapter from "./Adapter"


//map photos here
class Photo extends Component {
  render() {
    // console.log(this.props)
    return (
      <ul>
        <li>{this.props.photos[0].caption}</li>
      </ul>
    )
  }
}

export default Photo;
