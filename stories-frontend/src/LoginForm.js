import React, { Component } from "react";

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
      <form onSubmit={this.handleLogInSubmit}>
        <label htmlFor="username">Username</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleInputChange}>
          </input>
        <label htmlFor="password">Password</label>
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleInputChange}>
          </input>
          <input type="submit" value="Log In"></input>
        </form>
    )
  }
}

export default LoginForm;
