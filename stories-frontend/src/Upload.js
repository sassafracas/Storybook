import React, { Component, Fragment } from "react";
import Adapter from "./Adapter";
import { Form, Input, TextArea, Button, Image, Icon, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { v4 } from "uuid";
import { Field, reduxForm } from 'redux-form';
import { InputField, TextAreaField } from 'react-semantic-redux-form';

class Upload extends Component {



  render(){
    console.log("upload props ", this.props);
    return(
      <Fragment key={v4()}>
      <Form onSubmit={this.props.handlePhotoUpload} key={v4()}>
        <h2>Upload A Photo</h2>
        <Field
          key={v4()}
          component={InputField}
          required
          error={!this.props.titleValid}
          label="Story Title"
          type="text"
          value={this.props.title}
          name="title"
          placeholder="Story Title"
          onChange={(event, data)=> this.props.handlePhotoInputChange(event, data)} />
        <Field
          component={TextAreaField}
          label="Story Description"
          key={v4()}
          type="text"
          value={this.props.description}
          name="description"
          placeholder="Story Text"
          onChange={(event, data)=> this.props.handlePhotoInputChange(event, data)} />

        <Field
          component={TextAreaField}
          key={v4()}
          required
          error={!this.props.captionValid}
          label="Caption"
          value={this.props.caption}
          name="caption"
          placeholder="Photo Caption"
          onChange={this.props.handlePhotoInputChange} />

        {this.props.formErrors.caption ? <Message error header={this.props.formErrors.caption}/> : "" }

        <Form.Group inline>
        <Form.Radio
            label='Private'
            value={true}
            checked={this.props.private === true}
            onChange={this.props.handleRadioButton}
          />
          <Form.Radio
            label='Public'
            value={false}
            checked={this.props.private === false}
            onChange={this.props.handleRadioButton}
          />
        </Form.Group>
        <Form.Field key={v4()} required error={!this.props.pictureValid}>
          <label>Photo</label>
          <Input
            key={v4()}
            type="file"
            name="picture"
            multiple={true}
            accept="image/*"
            onChange={(event, data) => this.props.photoChange(event, data)}
            ></Input>
        </Form.Field>
        <Form.Field>
          <Button type="submit" disabled={!this.props.formValid}>Upload Your Photo</Button>
        </Form.Field>
      </Form>
      {this.props.picture[0] ? this.props.mapPhotoPreviews() : <h4>Preview of Photos</h4>}
      </Fragment>
    )
  }
}

export default withRouter(reduxForm({form: "uploadForm"})(connect(mapStateToProps)(Upload)));
