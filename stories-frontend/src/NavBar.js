import React, { Fragment } from "react";
import { NavLink } from 'react-router-dom';
import Adapter from "./Adapter"

const NavBar = (props) => {
  return (
    <header>
         { Adapter.isLoggedIn() ?
           <Fragment>
             <NavLink exact to="/my-stories">My Stories</NavLink>
             <NavLink exact to="/explore">Explore</NavLink>
             <NavLink exact to="/upload">Upload</NavLink>
             <button onClick={() => {
                 Adapter.logout();
                 props.history.push("/login");
               }}>Logout</button>
               </Fragment>
           :
             <Fragment>
               <NavLink  exact to="/register">Registration</NavLink>
               <NavLink  exact to="/login">Login</NavLink>
             </Fragment>
         }
     </header>
   )
}

export default NavBar;
