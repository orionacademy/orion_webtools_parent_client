import React from 'react'

import LoginMenu from './LoginMenu.js';
import AdminView from "./AdminView.js";

import CollectionForm from './CollectionForm.js'

import configValues from "../config.js"


// React libraries
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

//// **** INITIALIZATIONS **** ////
// sets up the uniqid hashing function for use with component id's
var uniqid = require('uniqid');
var Loader = require('react-loader');



// TODO: add a link to the 'home' route from here so that
// users land on / and can't leave in the form of a conditional
// rendering function (call ParentView on success with StudentID passed in)

// goal: parents start in login menu, upon success something allows them into the
// parent view with the StudentID as a prop

class AdminClient extends React.Component {
    state = { username: "", password: "", loginState: "", admin: false, loading: false, loaded: true }

    componentDidMount() {
        this.setState({
            loginState:
                <CollectionForm >
                    <LoginMenu
                        callbackButton={() => this.authCheck()}
                        callbackOnChangeUsername={(event) => this.updateUsernameState(event)}
                        callbackOnChangePassword={(event) => this.updatePasswordState(event)}
                        loadedState={this.state.loaded}
                    />
                </CollectionForm>
        })
    }

    // updates the state on keystroke change
    updateUsernameState(event) {
        this.setState({ username: event.target.value })
    }

    updatePasswordState(event) {
        this.setState({ password: event.target.value })
    }

    // TODO: update the fetch to search for a parent username and password!
    async authCheck() {
        this.setState({ loading: true, loaded: false })
        await console.log("authcheck started, update finished9!", configValues.serverURL, this.state.loading)


        await fetch(configValues.serverURL + "/admin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'https://ogjaylowe.github.io'
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        })
            .then(res => res.json())
            .then(admin => {
                console.log(admin)
                if (admin != false) {
                    this.setState({ admin })
                }
            })
            .then(() => this.conditionalCheck())
            
        await this.setState({loading: false, loaded: true})
    }

    // performs auth check
    conditionalCheck() {
        if (this.state.admin != false) {
            this.setState({ loginState: <AdminView /> })
        } else {
            alert(this.state.condition + " is not a registered username!")
        }
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/" >
                            <Loader loaded={this.state.loaded}>
                                {this.state.loginState}
                            </Loader>
                        </Route>
                    </Switch>
                </Router>
            </div >
        )
    }
}

export default AdminClient