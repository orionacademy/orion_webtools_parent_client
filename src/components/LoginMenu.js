import React from "react";

import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

var Loader = require('react-loader');



class LoginMenu extends React.Component {
    state = {}

    render() {
        return (
            <div className="uk-width-1-1">

                <div>
                    <br />
                    <br />
                    <p className="uk-text-lead">Orion Academy Webtools and Database</p>
                    <p className="uk-text-meta">(Parent View - Username = pparent, Password = 123)</p>
                    <p className="uk-text-meta">(Admin View - Username = admin, Password = 123)</p>
                    <h4>Heroku server may take a minute to wake up upon data submission!</h4>


                    <br />
                    <br />
                    <div>
                        <label htmlFor="userName">Username: </label>
                        <input
                            className="uk-input uk-form uk-form-width-medium uk-margin-right uk-margin-left"
                            id="userName"
                            type="text"
                            placeholder="Username"
                            onChange={this.props.callbackOnChangeUsername}
                        />
                        <label htmlFor="pwd">Password: </label>
                        <input
                            className="uk-input uk-form uk-form-width-medium uk-margin-right uk-margin-left"
                            id="Pwd"
                            type="text"
                            placeholder="Password"
                            onChange={this.props.callbackOnChangePassword}
                        />

                        <AwesomeButton
                            id="awesome button"
                            size={'large'}
                            type="primary"
                            onPress={this.props.callbackButton}
                        >
                            Log In
                        </AwesomeButton>
                        

                    </div>
                    <br />
                    <br />
                    <p className="uk-text-medium uk-margin-top uk-margin-bottom">Don't have a username and password, or forgot yours? Email your student's homeroom teacher for assistance!</p>
                    <p className="uk-text-meta uk-margin-top uk-margin-bottom">Students must complete 350 hours of homebriding activity to fufill the physical education requirement. Log in to see your student's progress.</p>
                </div>
            </div>
        )
    }
}

export default LoginMenu;

