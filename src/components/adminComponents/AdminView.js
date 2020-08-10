import React from "react";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Nav from "./Nav.js";
import CollectionForm from './CollectionForm.js'

// tab components
import ParentHomebriding from './ParentHomebriding.js';
import ParentDetentionCenterView from './ParentDetentionCenterView.js';
import ParentHomeworkClubView from './ParentHomeworkClubView.js';

// React libraries
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// <button onClick={this.props.callbackFunction} type="button"  className="uk-align-right uk-margin-right uk-button uk-button-primary">Log In</button>

// TODO: convert to class and use fetch with setState to --> then passdown state values as props
function ParentView(props) {
    return (


        <div>
            <Router>
                <Nav />

                <Switch>
                    <Route path="/detentioncenter">
                        <ParentDetentionCenterView />
                    </Route>

                    <Route path="/homeworkclub">
                        <ParentHomeworkClubView />
                    </Route>

                    <Route path="/homebriding">
                        <ParentHomebriding studentId={props.studentId} />
                    </Route>

                    <Route path="/supporttickets" >
                        <h1>Coming soon!</h1>
                    </Route>

                    <Route path="/guides" >
                        <h1>Coming soon!</h1>
                    </Route>

                    <Route path="/procedures" >
                        <h1>Coming soon!</h1>
                    </Route>

                    <Route path="/home" >
                        <CollectionForm collectionLegend={""}>
                            Welcome to the Orion Academy Web Tool!
                        </CollectionForm>

                    </Route>
                </Switch>

            </Router>

        </div >
    )
}

export default ParentView;