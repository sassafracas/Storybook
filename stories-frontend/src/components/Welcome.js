import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

class Welcome extends Component {
  render(){
    return (
      <div style={{"backgroundImage": "url(http://www.allwhitebackground.com/images/2/2280.jpg)", "height": window.innerHeight}}>
        <Header style={{"marginBottom": "10%", "letterSpacing": "4px", "paddingTop": "10%"}} as="h1">S T O R Y  B O O K</Header>
        <Segment  padded compact floated="left" style={{"marginLeft": "29%", "fontSize": "20px", "width" : "520px"}}>
          <Segment basic style={{"fontSize": "20px", "width" : "560px"}}>If a picture is worth 1,000 words, then an album tells a story.</Segment>
                  <Segment basic style={{"fontSize": "20px", "width" : "520px"}}>    Upload and share all your stories on Storybook.</Segment>
        </Segment>
      </div>
    )
  }
}

export default Welcome;
