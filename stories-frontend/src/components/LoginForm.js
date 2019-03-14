import React, { Component } from "react";
import { Form, Input, Container, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

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

  render(){
    return (
      <Container text style={{"marginTop": "300px"}}>
        {this.props.errors ? <Message error header={this.props.errors}/> : "" }
      <Form onSubmit={(event)=>this.props.handleLogInSubmit(event, this.state.username, this.state.password)}>
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

export default withRouter(LoginForm);
