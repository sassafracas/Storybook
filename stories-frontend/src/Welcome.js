import React, { Component, Fragment } from 'react';
import { Segment, Header, Container } from 'semantic-ui-react';

class Welcome extends Component {
  render(){
    return (
      <div style={{"background-image": "url(http://www.allwhitebackground.com/images/2/2280.jpg)", "height": window.innerHeight}}>
        <Header style={{"margin-bottom": "200px", "letter-spacing": "4px", "padding-top": "200px"}} as="h1">S T O R Y  B O O K</Header>
        <Segment  padded compact floated="left" style={{"margin-left": "670px", "font-size": "20px", "width" : "520px"}}>
          <Segment basic style={{"font-size": "20px", "width" : "560px"}}>If a picture is worth 1,000 words, then an album tells a story.</Segment>
                  <Segment basic style={{"font-size": "20px", "width" : "520px"}}>    Upload and share all your stories on Storybook.</Segment>
        </Segment>
      </div>
    )
  }
}

export default Welcome;
