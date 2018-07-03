import React, { Fragment, Component } from "react";
import { NavLink, Link, Switch, withRouter } from 'react-router-dom';
import Adapter from "./Adapter"
import { Menu, Segment } from 'semantic-ui-react';

class NavBar extends Component {

  state = {
    activeItem: "my-stories"
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name }, ()=> this.props.history.push(`/${name}`))

  render(){

  const { activeItem } = this.state

  return (
        <Fragment>
         { Adapter.isLoggedIn() ?
      <Menu pointing secondary>
           <Menu.Menu>
             <Menu.Item name="my-stories" active={activeItem === 'my-stories'} onClick={this.handleItemClick}>
               My Stories
             </Menu.Item>
             <Menu.Item name="explore" active={activeItem === 'explore'} onClick={this.handleItemClick}>
               Explore
             </Menu.Item>
             <Menu.Item name="upload" active={activeItem === 'upload'} onClick={this.handleItemClick}>
               Upload
             </Menu.Item>
             </Menu.Menu>
             <Menu.Menu position="right">
               <Menu.Item name="logout" active={activeItem === 'logout'} onClick={() => {
                   this.handleItemClick;
                   Adapter.logout();
                   this.props.routeInfo.history.push("/login");
                 }}>
               </Menu.Item>
             </Menu.Menu>
      </Menu>

           :
             <Menu>
               <Menu.Item name="register" active={activeItem === 'register'} onClick={this.handleItemClick}>
                 <Link to="/register">Registration</Link>
               </Menu.Item>
               <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleItemClick}>
                 <Link to="/login">Login</Link>
               </Menu.Item>
             </Menu>
         }
</Fragment>
   )
 }
}

export default withRouter(NavBar);
