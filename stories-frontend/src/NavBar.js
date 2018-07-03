import React, { Fragment } from "react";
import { NavLink } from 'react-router-dom';
import Adapter from "./Adapter"

const NavBar = (props) => {
  return (
    <header>
         { Adapter.isLoggedIn() ?
           <Fragment>
             <NavLink
               activeStyle={{
                 fontWeight: 'bold',
                 color: 'red'
               }}
               exact to="/my-stories">My Stories</NavLink>
             <NavLink
               activeStyle={{
                 fontWeight: 'bold',
                 color: 'red'
               }}
               exact to="/explore">Explore</NavLink>
             <NavLink activeStyle={{
                 fontWeight: 'bold',
                 color: 'red'
               }}exact to="/upload">Upload</NavLink>
             <button onClick={() => {
                 Adapter.logout();
                 props.history.push("/login");
               }}>Logout</button>
            </Fragment>
           :
             <Fragment>
               <NavLink
                 activeStyle={{
                   fontWeight: 'bold',
                   color: 'red'
                 }}
                 exact to="/register">Registration</NavLink>
               <NavLink
                 activeStyle={{
                   fontWeight: 'bold',
                   color: 'red'
                 }}
                 exact to="/login">Login</NavLink>
             </Fragment>
         }
     </header>
   )
}

export default NavBar;
