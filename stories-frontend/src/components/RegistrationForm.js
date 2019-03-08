import React, { Component } from 'react';
import { Form, Input, Container, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class RegistrationForm extends Component {
  state = {
    username: "",
    password: "",
    regErrors: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/users/`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(json => {
        if (json.errors) {this.setState({ regErrors: json.errors})} else {
        console.log(json);
        localStorage.setItem('token', json.token);
        this.props.history.push("/");
      }})
  }

  render() {
    return (
      <Container text style={{"margin-top": "300px"}}>
        {this.state.regErrors ? <Message error header={this.state.regErrors}/> : "" }
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
        <label htmlFor="username">Username</label>
          <Input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}>
          </Input>
          </Form.Field>
          <Form.Field>
        <label htmlFor="password">Password</label>
          <Input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}>
          </Input>
          </Form.Field>
          <Input type="submit" value="Register"></Input>
        </Form>
      </Container>
    )
  }
}

export default withRouter(RegistrationForm);
