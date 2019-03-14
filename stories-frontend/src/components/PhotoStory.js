import React, { Component, Fragment } from "react";
import Photo from "./Photo";
import { Container, Header, Divider, Segment, Modal, Button, Icon } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import { withRouter } from 'react-router-dom';

class PhotoStory extends Component {

  render(){
    return(
      <div>
        <Modal
          trigger={<Button floated="right" animated basic color="black">
                    <Button.Content visible>Slideshow</Button.Content>
                    <Button.Content hidden><Icon name='images'/></Button.Content>
                   </Button>}
          basic
          size='large'
          centered={true}>
            <Modal.Content>
              <Carousel infiniteLoop useKeyboardArrows dynamicHeight>
                {this.props.history.location.state.photos.map(photo => {return <div key={photo.id}><img src={`https://localhost:3000${photo.picture.url}`} alt=''/> <p className="legend">{photo.caption}</p></div>})}
              </Carousel>
            </Modal.Content>
        </Modal>
      <h1>{this.props.history.location.state.title}</h1>
      <Photo currentUserId={this.props.currentUserId} routeInfo={this.props.history.location.pathname} photos={this.props.history.location.state.photos} editCaptionInState={this.props.editCaptionInState}/>
      <Segment basic>
        <Container text>{this.props.history.location.state.description ? <Fragment><Header as='h2'>Description</Header><Divider/>{this.props.history.location.state.description}</Fragment> : ""}</Container>
      </Segment>
      </div>
    )
  }

}

export default withRouter(PhotoStory);
