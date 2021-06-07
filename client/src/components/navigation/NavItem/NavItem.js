import React from "react";
import { NavLink } from "react-router-dom"
import classes from './NavItem.module.css'

function NavItem({ name, path, isCurrent, onClick }) {
  return (
    <li
      className={classes.ListItem}
      onClick={onClick}
    >
      <NavLink
        className={classes.NavLink}
        activeClassName={classes.NavLinkActive}
        to={path}
        isActive={(match, location) => {
          if (location.pathname === path) {
            return true
          }
        }}
      >
        {name}
      </NavLink>
    </li>
  );
}

NavItem.defaultProps = {
  path: "/",
  name: "/",
  isCurrent: false
};

export default NavItem;