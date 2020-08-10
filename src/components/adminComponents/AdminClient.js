import React from 'react'

import LoginMenu from '../components/LoginMenu.js';
import AdminView from "./components/AdminView.js";

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

class AdminClient extends React.Component {
    state = { condition: "", loginState: "", parent: false }

    componentDidMount() {
        this.setState({
            loginState:
                <LoginMenu
                    callbackButton={() => this.authCheck()}
                    callbackOnChange={(event) => this.updateLoginState(event)}
                />
        })
    }

    // updates the state on keystroke change
    updateLoginState(event) {
        this.setState({ condition: event.target.value })
    }

    // TODO: update the fetch to search for a parent username and password!
    authCheck() {
        fetch('/parents', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ fname: this.state.condition })
        })
            .then(res => res.json())
            .then(parent => {
                if (parent != false) {
                    this.setState({ parent })
                }
            })
            .then(() => this.conditionalCheck())
    }

    // performs auth check
    conditionalCheck() {
        //console.log(this.state)
        // TODO: instead of using false here, make a prop in parent called userType and have it = parent
        if (this.state.parent != false) {
            this.setState({ loginState: <AdminView studentId={this.state.parent.student} /> })
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
                            {this.state.loginState}
                        </Route>
                    </Switch>
                </Router>
            </div >
        )
    }
}

export default AdminClient