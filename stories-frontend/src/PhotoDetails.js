import React, { Component } from "react";
import Photo from "./Photo";
import { Container, Header, Divider, Segment } from 'semantic-ui-react';

class PhotoDetails extends Component {


  render(){
    console.log("inside photodetails ",this.props)
    return(
      <div>
      <h1>{this.props.location.state.photostory.title}</h1>
      <Photo routeInfo={this.props.location.pathname} photos={this.props.location.state.photostory.photos} />
      <Segment basic>
      <Container text><Header as='h2'>Description</Header><Divider />{this.props.location.state.photostory.description ? this.props.location.state.photostory.description : ""}</Container>
      </Segment>
      </div>
    )
  }

}

export default PhotoDetails;
