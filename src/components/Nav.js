import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function Nav() {
    return (
        <div>
            <div className="not_mobile">
                <nav className="uk-navbar-container uk-width-1-1" uk-navbar="true" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">

                    <div className="uk-navbar-center">

                        <div className="uk-navbar-center-left">
                            <div>
                                <ul className="uk-navbar-nav">
                                    <li className="">
                                        <Link to="/detentioncenter">
                                            Detention Center
                                        </Link>
                                    </li>
                                    <li className="">
                                        <Link to="/homeworkclub">
                                            Homework Club
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Link className="uk-navbar-item uk-logo" to="/home">
                            Orion
                        </Link>

                        <div className="uk-navbar-center-right">
                            <div>
                                <ul className="uk-navbar-nav">
                                    <li className="">
                                        <Link to="/homebriding">
                                            Homebriding
                                        </Link>
                                    </li>

                                    <li>
                                        <ul className="uk-navbar-nav">
                                            <li className="">
                                                <a href="#">
                                                    <span >Support</span>
                                                </a>
                                            </li>
                                        </ul>

                                        <div className="uk-navbar-dropdown" uk-dropdown="mode: click; pos: bottom-justify; offset: 10">
                                            <ul className="uk-nav uk-navbar-dropdown-nav">
                                                <li className="uk-active"><a href="#">Support Tickets</a></li>
                                                <li>
                                                    <Link to="/guides">
                                                        Guides
                                                    </Link>
                                                </li>
                                                <li><a href="#">Procedures</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </nav>
            </div>

        </div >
    )
}

export default Nav