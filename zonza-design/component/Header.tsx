import style from "../styles/Header.module.scss";
import "bootstrap/dist/css/bootstrap.css";
import { BASE_URL } from "../constants/constants";
import React, { useState } from "react";
import { useRouter } from "next/router";

const HeaderComponent = () => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const openMenu = ()  => {
        setOpen(!open)
    }
    return (
        <div>
            
     <header className={style.header}> 
                <div className="container">
                    <div className={style.innerHeader}>
                        <div className={style.logo}>
                            <img
                                alt="logo"
                                src={`${BASE_URL}/images/logo.png`}
                            />
                        </div>
                        <div className={style.rightheader}>
                            <nav className={`${open ? style.openMenu: ''}`}>
                                <ul>
                                    <li>
                                        <a href={`${BASE_URL}`}  className={router.pathname == "/" ? style.active : ""}>HJEM</a>
                                    </li>
                                    <li>
                                        <a  className={router.pathname == "/about-us" ? style.active : ""} href={`${BASE_URL}/about-us`}>
                                            OM OSS
                                        </a>
                                    </li>
                                    <li>
                                        <a className={router.pathname == "/portfolio" ? style.active : ""} href={`${BASE_URL}/portfolio`}>
                                            PORTFOLIO
                                        </a>
                                    </li>
                                    <li>
                                        <a className={router.pathname == "/feedback" ? style.active : ""} href={`${BASE_URL}/feedback`}>
                                            TILBAKEMELDING
                                        </a>
                                    </li>
                                    <li>
                                        <a className={router.pathname == "/contact" ? style.active : ""} href={`${BASE_URL}/contact`}>
                                            KONTAKT
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <button className={`${style.menuburgure} ${open ? style.openMenu: ''}`}
                        onClick={openMenu}>
                            <span className={style.line}></span>
                            <span className={style.line}></span>
                            <span className={style.line}></span> 
                    </button> 

                    </div>
                </div>
            </header>
        </div>
    );
};
export default HeaderComponent;
