import React, { Component } from "react";
import Adapter from "./Adapter";
import Photo from "./Photo";
import { Link, withRouter } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';

class PhotoStory extends Component {

  render() {
   console.log("photostory props ", this.props)
    return (
      <Segment vertical>
        <Link to={{
            pathname: `/my-stories/${this.props.photostory.id}`,
            state: this.props.photostory
          }}><h3>{this.props.photostory.title}</h3></Link>
        <Button basic color='red' compact size="small" floated="right" onClick={() => this.props.deletePhotostory(this.props.photostory)}>Delete Story</Button>
        <Photo photos={this.props.photostory.photos} history={this.props.history} editCaptionInState={this.props.editCaptionInState} />
      </Segment>
    )
  }
}

export default withRouter(PhotoStory);
