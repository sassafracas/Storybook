import React, { Component, Fragment } from 'react';
import { Segment, Header } from 'semantic-ui-react';

class Welcome extends Component {
  render(){
    return (
      <Segment basic>
        <Header as="h2">Welcome to Story</Header>
      </Segment>
    )
  }
}

export default Welcome;
