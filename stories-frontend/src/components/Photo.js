import React, { Component, Fragment } from "react";
import Adapter from "./Adapter";
import { Card, Image, Modal, Button, Icon, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';


//map photos here
class Photo extends Component {

  state = {
    editable: false,
    caption: "",
    selectedPhoto: ""
  }

  changeCaptionState = (event, buttonInfo) => {
    this.setState({caption: buttonInfo.value})
  }

  makeCaptionAnInput = (photo) => {
    return <Fragment><Input defaultValue={photo.caption} onChange={(event, buttonInfo) => this.changeCaptionState(event, buttonInfo)}></Input><Button basic color="black" onClick={this.patchCaption} type="submit">Done</Button></Fragment>
  }
//have it send an update to the photo prop it's getting
  patchCaption = () => {
    console.log(this.state.selectedPhoto);
    Adapter.updatePhotoCaption(this.state.selectedPhoto, this.state.caption).then(r=> r.json()).then(json => this.props.editCaptionInState(json)).then(this.setState({editable: false}))

  }

  makeEditable = (event, buttonInfo, photo) => {
    this.setState({
      editable: !this.state.editable,
      selectedPhoto: photo.id
    })
  }

  mapLargePhotos = () => {
    return <Card.Group itemsPerRow={2}>
            {this.props.photos.map(photo => {return (
              <Card key={photo.id} fluid>
                <Modal closeOnDocumentClick={true} dimmer={"blurring"} size={"fullscreen"} trigger={<Image src={`http://localhost:3000${photo.picture.url}`} fluid/>}>
                <Modal.Content image>
                  <Image src={`http://localhost:3000${photo.picture.url}`} wrapped fluid/>
                </Modal.Content>
                </Modal>
                <Card.Content>
                  <Card.Header key={photo.id}>  <Button basic icon floated="left" size="mini" onClick={(event, buttonInfo) => this.makeEditable(event, buttonInfo, photo)}> <Icon name='edit'/></Button>{this.state.selectedPhoto === photo.id && this.state.editable ? this.makeCaptionAnInput(photo) : photo.caption}</Card.Header>
                </Card.Content>
              </Card>
            )
          })}
        </Card.Group>
  }
//make a ternary for photo caption, if state is set to edit then render a textarea with the photo caption prewritten in and  submit that patches to server otherwise just render the photo caption
  mapSmallPhotos = () => {
    return <Card.Group itemsPerRow={6}>
            {this.props.photos.map(photo => {return (
              <Card key={photo.id}>
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
    return (
      <div>
        {this.props.routeInfo === `/my-stories/${this.props.photos[0].photo_story_id}` ? this.mapLargePhotos() : this.mapSmallPhotos()}
      </div>
    )
  }
}

export default withRouter(Photo);
