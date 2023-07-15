import React, { useState } from 'react'
import style from './header.module.scss'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames';
import Nav from './Nav';
import MobileNavigation from './MobileNavigation';

const Header = () => {

    return (
        <div className={style.header_container}>
            <Link to='/' className={style.logo}>Alugar.</Link>

            <Nav/>
            <MobileNavigation />
        </div>
    )
}

export default Header