import React, { Component } from "react";
import { Form, Input, TextArea, Button, Image, Segment, Container } from 'semantic-ui-react';

class LoginForm extends Component {

  state = {
    username: "",
    password: ""
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogInSubmit = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3000/sessions/`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(r => r.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.props.history.push("/");
      })
  }

  render(){
    return (
      <Container text>
      <Form onSubmit={this.handleLogInSubmit}>
        <Form.Field>
        <label htmlFor="username">Username</label>
          <Input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}>
          </Input>
          </Form.Field>
          <Form.Field>
        <label htmlFor="password">Password</label>
          <Input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}>
          </Input>
          </Form.Field>
          <Input type="submit" value="Log In"></Input>
        </Form>
      </Container>
    )
  }
}

export default LoginForm;
