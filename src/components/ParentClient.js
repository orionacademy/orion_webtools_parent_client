import React from 'react'

import LoginMenu from './LoginMenu.js';
import ParentView from "./ParentView.js";

import CollectionForm from './CollectionForm.js'

import configValues from '../config.js';



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

class ParentClient extends React.Component {
    state = { username: "", password: "", loginState: "", parent: false, loaded: true }

    

    componentDidMount() {
        console.log("mount ", this.state.parent)
        this.setState({
            loginState:
                <CollectionForm >
                    <LoginMenu
                        callbackButton={() => this.authCheck()}
                        callbackOnChangeUsername={(event) => this.updateUsernameState(event)}
                        callbackOnChangePassword={(event) => this.updatePasswordState(event)}
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
        this.setState({ loaded: false })

        await fetch(configValues.serverURL + "/parents", {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        })
            .then(res => res.json())
            .then(parent => {
                if (parent != false) {
                    console.log("auth", parent)
                    this.setState({ parent })
                }
            })
            .then(() => this.conditionalCheck())

        await this.setState({loaded: true})
    }

    // performs auth check
    conditionalCheck() {
        //console.log(this.state)
        // TODO: instead of using false here, make a prop in parent called userType and have it = parent
        if (this.state.parent != false) {
            this.setState({ loginState: <ParentView studentId={this.state.parent.student} /> })
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

export default ParentClient