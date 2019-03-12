import React, { Component } from "react";
import Photo from "./Photo";
import { Link, withRouter } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';

class MyStoriesItem extends Component {

  render() {
    return (
      <Segment vertical>
        <Link to={{
            pathname: `/my-stories/${this.props.photostory.id}`,
            state: this.props.photostory
          }}><h3>{this.props.photostory.title}</h3></Link>
        { this.props.location.pathname === "/explore" ? 
          "" 
          : 
          <Button 
            basic color='red' 
            compact size="small" 
            floated="right" 
            onClick={() => this.props.deletePhotostory(this.props.photostory)}>Delete Story</Button>}
        <Photo 
          photos={this.props.photostory.photos} 
          history={this.props.history} 
          editCaptionInState={this.props.editCaptionInState} />
      </Segment>
    )
  }
}

export default withRouter(MyStoriesItem);
