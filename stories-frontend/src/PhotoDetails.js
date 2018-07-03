import React, { Component, Fragment } from "react";
import Photo from "./Photo";
import { Container, Header, Divider, Segment, Modal, Button, Icon } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

class PhotoDetails extends Component {

  render(){
    console.log("inside photodetails ",this.props)
    return(
      <div>
        <Modal
          trigger={<Button floated="right" animated basic color="black">
                    <Button.Content visible>Slideshow</Button.Content>
                    <Button.Content hidden><Icon name='images'/></Button.Content>
                   </Button>}
          basic
          size='large'
          centered="true">
            <Modal.Content>
              <Carousel infiniteLoop useKeyboardArrows dynamicHeight>
                {this.props.location.state.photostory.photos.map(photo => {return <div><img src={`http://localhost:3000${photo.picture.url}`} /> <p className="legend">{photo.caption}</p></div>})}
              </Carousel>
            </Modal.Content>
        </Modal>
      <h1>{this.props.location.state.photostory.title}</h1>
      <Photo routeInfo={this.props.location.pathname} photos={this.props.location.state.photostory.photos} />
      <Segment basic>
        <Container text>{this.props.location.state.photostory.description ? <Fragment><Header as='h2'>Description</Header><Divider/>{this.props.location.state.photostory.description}</Fragment> : ""}</Container>
      </Segment>
      </div>
    )
  }

}

export default PhotoDetails;
