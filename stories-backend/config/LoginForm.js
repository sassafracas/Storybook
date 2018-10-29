import React, { Component } from "react";
import { Form, Input, TextArea, Button, Image, Segment, Container } from 'semantic-ui-react';

class LoginForm extends Component {

  render(){
    console.log("log in form props ", this.props)
    return (
      <Container text>
      <Form onSubmit={this.props.handleLogInSubmit}>
        <Form.Field>
        <label htmlFor="username">Username</label>
          <Input
            type="text"
            value={this.props.username}
            name="username"
            onChange={this.props.handleInputChange}>
          </Input>
          </Form.Field>
          <Form.Field>
        <label htmlFor="password">Password</label>
          <Input
            type="password"
            value={this.props.password}
            name="password"
            onChange={this.props.handleInputChange}>
          </Input>
          </Form.Field>
          <Input type="submit" value="Log In"></Input>
        </Form>
      </Container>
    )
  }
}

export default LoginForm;
