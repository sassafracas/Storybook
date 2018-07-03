import React, { Component, Fragment } from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';

class Welcome extends Component {
  render(){
    return (
      <div style={{"background-image": "url(http://www.allwhitebackground.com/images/2/2280.jpg)", "height": window.innerHeight}}>
        <Header style={{"margin-bottom": "200px", "letter-spacing": "4px", "padding-top": "200px"}} as="h1">S T O R Y  B O O K</Header>
        <Segment  padded compact floated="left" style={{"margin-left": "700px", "font-size": "20px", "width" : "520px"}}>
          If a picture is a 1,000 words, then an album is a story.
                      Upload and share all your stories.
        </Segment>
      </div>
    )
  }
}

export default Welcome;
