import React, { Component } from "react";
import Adapter from "./Adapter";
import Photo from "./Photo";
import { Link } from 'react-router-dom';
import { Segment, Visibility, Loader } from 'semantic-ui-react';

class PhotoStory extends Component {

  state = {
    show: false
  }

  deletePhotostory = () => {
    Adapter.deleteOnePhotostory(this.props.photostory.id).then(r => console.log(r))
  }

  showPhotostory = () => {
    this.setState ({
      show: true
    }, () => console.log("visible"))
  }

  render() {
   console.log("photostory props ", window.innerHeight)


        if (!this.state.show) {
          return (<div style={{height: window.innerHeight}}>
                  <Visibility continuous onTopVisible={this.showPhotostory}>
                    <Loader active inline="centered" />
                  </Visibility>
                </div>
                )
          }
          return (<Segment vertical>
            <Link to={{
                pathname: `/my-stories/${this.props.photostory.id}`,
                state: {...this.props}
              }}><h3>{this.props.photostory.title}</h3></Link>
              <button onClick={this.deletePhotostory}>Delete Story</button>
              <Photo photos={this.props.photostory.photos}/>
            </Segment>)

}


}



export default PhotoStory;
