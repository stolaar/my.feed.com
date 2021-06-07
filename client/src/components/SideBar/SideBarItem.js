import React from "react";
import { NavLink } from "react-router-dom"
import SideBarCss from './SideBar.module.css'

function SideBarItem({ name, path, isCurrent, onClick }) {
  return (
    <li
      className={SideBarCss.listItemSB}
      onClick={onClick}
    >
      <NavLink
        className={SideBarCss.navLink}
        activeClassName={SideBarCss.navLinkActive}
        to={path}
        isActive={(match, location) => location.pathname === path }
      >
        <span className={SideBarCss.iconSidebar}><i className="fas fa-user"></i></span> {name}
      </NavLink>
    </li>
  );
}

SideBarItem.defaultProps = {
  path: "/",
  name: "/",
  isCurrent: false
};

export default SideBarItem;