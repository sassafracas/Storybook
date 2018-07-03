import React, { Fragment, Component } from "react";
import { NavLink, Link, Switch } from 'react-router-dom';
import Adapter from "./Adapter"
import { Menu, Segment } from 'semantic-ui-react';

export default class NavBar extends Component {

  state = {
    activeItem: "My Stories"
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
render(){

  const { activeItem } = this.state

  return (
        <Fragment>
         { Adapter.isLoggedIn() ?
      <Menu pointing secondary>
           <Menu.Menu>
             <Menu.Item name="My Stories" active={activeItem === 'My Stories'} onClick={this.handleItemClick}>
               <Link exact to="/my-stories">My Stories</Link>
             </Menu.Item>
             <Menu.Item name="Explore" active={activeItem === 'Explore'} onClick={this.handleItemClick}>
               <Link exact to="/explore">Explore</Link>
             </Menu.Item>
             <Menu.Item name="Upload" active={activeItem === 'Upload'} onClick={this.handleItemClick}>
               <Link exact to="/upload">Upload</Link>
             </Menu.Item>
             </Menu.Menu>
             <Menu.Menu position="right">
               <Menu.Item name="Logout" active={activeItem === 'Logout'} onClick={() => {
                   this.handleItemClick;
                   Adapter.logout();
                   this.props.routeInfo.history.push("/login");
                 }}>
               </Menu.Item>
             </Menu.Menu>
      </Menu>

           :
             <Menu>
               <Menu.Item name="Register" active={activeItem === 'Register'} onClick={this.handleItemClick}>
                 <Link exact to="/register">Registration</Link>
               </Menu.Item>
               <Menu.Item name="Login" active={activeItem === 'Login'} onClick={this.handleItemClick}>
                 <Link exact to="/login">Login</Link>
               </Menu.Item>
             </Menu>
         }
</Fragment>
   )
 }
}
