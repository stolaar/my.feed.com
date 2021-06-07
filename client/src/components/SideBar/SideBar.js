import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setSideBar } from '../../store/actions/feedbackActions'

import SideBarCss from './SideBar.module.css'


const SideBar = () => {

    const {feedback:{showSideBar}} = useSelector(state => state);
    const dispatch = useDispatch()
    const onClickShowSidebar = () => dispatch(setSideBar(!showSideBar));


    return (
        <nav className={ showSideBar ? `${SideBarCss.navMenu} ${SideBarCss.navMenuActive}` : SideBarCss.navMenu }>
            <div>
                <span className={SideBarCss.closeIcon} onClick={onClickShowSidebar} >
                    <i className="far fa-window-close fa-2x"></i>
                </span>
            </div>
            <ul style={{width: '100%', marginTop:150}} >

            </ul>
        </nav>
    )
}

export default SideBar
