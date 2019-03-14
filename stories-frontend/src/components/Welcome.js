import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import background from '../cloud_background.jpg'

class Welcome extends Component {
  render(){
    return (
      <div style={{"backgroundImage": `url(${background})`, "height": window.innerHeight}}>
        <Header style={{"marginBottom": "10%", "letterSpacing": "4px", "paddingTop": "10%", "textAlign" : "center"}} as="h1">S T O R Y  B O O K</Header>
        <Segment  padded compact style={{"fontSize": "20px", "top" : "50%", "left" : "50%", "transform" : "translate(-50%, -50%)", "position" : "absolute", "width" : "50%"}}>
          <Segment basic style={{"fontSize": "20px", "padding" : "0"}}>If a picture is worth 1,000 words, then an album tells a story.</Segment>
          <Segment basic style={{"fontSize": "20px"}}>    Upload and share all your stories on Storybook.</Segment>
        </Segment>
      </div>
    )
  }
}

export default Welcome;
