import React, { Component } from "react";
import Adapter from "./Adapter";
import { Segment, Card, Image, Modal } from 'semantic-ui-react';


//map photos here
class Photo extends Component {

  mapLargePhotos = () => {
    return <Card.Group itemsPerRow={2}>
            {this.props.photos.map(photo => {return (
              <Card fluid>
                <Modal closeOnDocumentClick={true} dimmer={"blurring"} size={"fullscreen"} trigger={<Image src={`http://localhost:3000${photo.picture.url}`} fluid/>}>
                <Modal.Content image>
                  <Image src={`http://localhost:3000${photo.picture.url}`} wrapped fluid/>
                </Modal.Content>
                </Modal>
                <Card.Content>
                  <Card.Header key={photo.id}>{photo.caption}</Card.Header>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
  }

  mapSmallPhotos = () => {
    return <Card.Group itemsPerRow={6}>
            {this.props.photos.map(photo => {return (
              <Card>
                <Image src={`http://localhost:3000${photo.picture.url}`}/>
                <Card.Content>
                <Card.Description key={photo.id}>{photo.caption}</Card.Description>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
  }

  render() {
    console.log("photo props ", this.props)
    return (
      <div>
        {this.props.routeInfo === `/my-stories/${this.props.photos[0].photo_story_id}` ? this.mapLargePhotos() : this.mapSmallPhotos()}
      </div>
    )
  }
}

export default Photo;
