import React from 'react';
import ReactDOM from 'react-dom';

// config object
import configValues from './config.js';

// React libraries
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

// custom components
import CardR from './components/CardR.js';
import CollectionForm from './components/CollectionForm.js';
import DescriptionText from './components/DescriptionText.js';
import Selector from './components/Selector.js';
import CallbackButton from './components/CallbackButton.js';
import CardTable from './components/CardTable.js';
import HomebridingTable from './components/HomebridingTable.js';
import SubmissionHome from './components/SubmissionHome.js';
import TableR from './components/TableR.js';

import './index.css';
import TableComponent from './components/TableComponent.js';

//// **** INITIALIZATIONS **** ////
// sets up the uniqid hashing function for use with component id's
var uniqid = require('uniqid');

// default values for the config object stored in state
var configObjectInit = {
    students: [],
    times: [],
    classes: []
}

//**TODO: add config objects for the various card collections

// list of students available to choose from
var students = configValues.students
var times = configValues.times
var classes = configValues.classes
var hwcHeaders = configValues.homeworkClubHeaders

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

//TODO: turn the router code into a navigation component

class App extends React.Component {
    ////**** DEFINITIONS ****////
    // gets transpiled into a constructor function
    state = { configObject: {}, detentionCardCollection: [], homeworkCardCollection: [], homebridingCardCollection: [] };

    // runs once at start during mounting, optimal for setting initial states
    componentDidMount() {
        this.setState({
            configObject: configObjectInit
        })
    }

    // React best practice = make a helper function to perform mutations outside of state object, then replace
    // the state object property completely instead of mutating arrays directly in state object
    /*
    stateArrayHelper() {
        // add student card to end of state object property "cardCollection" array
        this.setState(prevState => ({
            cardCollection: [...prevState.cardCollection,
            {
                key: uniqid(),
                cardComponent: <CardR studentName={this.state.configObject.studentName} time={this.state.configObject.descriptionTimem} descriptionText={this.state.configObject.descriptionText} />
            }]
        }))
    }
    */

    onClickAddDetentionCard() {
        //**TODO: figure out why configObject won't update within state properly--AKA: make this a controlled object*/
        // React best practice = store values inside of React instead of DOM elements
        /*
        var temp = {
            studentName: document.querySelector('#studentNames').value,
            detentionTime: document.querySelector('#detentionTimes').value,
            descriptionText: document.querySelector('#descriptionText').value
        }
        //this.setState(this.state.configObject = temp)
        this.setState({ configObject: temp })
        console.log(this.state.configObject)
        */

        var studentName = document.querySelector('#studentNames').value
        var detentionTime = document.querySelector('#detentionTimes').value
        var descriptionText = document.querySelector('#descriptionText').value
        var displayText = "Length of detention"
        //**TODO: make this a callback function
        //this.stateArrayHelper()
        this.setState(prevState => ({
            detentionCardCollection: [...prevState.detentionCardCollection,
            {
                key: uniqid(),
                cardComponent: <CardR studentName={studentName} selectorValue={detentionTime} displayValue={displayText} descriptionText={descriptionText} />
            }]
        }))
    }

    onClickAddHomeworkCard() {
        var studentName = document.querySelector('#studentNames').value
        var classSection = document.querySelector('#classSection').value
        var descriptionText = document.querySelector('#descriptionText').value
        var displayText = "Assignment for"

        this.setState(prevState => ({
            homeworkCardCollection: [...prevState.homeworkCardCollection,
            {
                key: uniqid(),
                cardComponent: <CardR studentName={studentName} selectorValue={classSection} displayValue={displayText} descriptionText={descriptionText} />,
                tableComponent: <TableComponent studentName={studentName} selectorValue={classSection} description={descriptionText} greenCheck=""/>
            }]
        }))
    }

    // uses the id of the event handler component to identify and remove student cards from the state object 
    // property "cardCollection" with a best practice helper function
    onClickRemoveCard(event) {
        this.setState(
            {
                detentionCardCollection: this.state.detentionCardCollection.filter(function (card) {
                    return card.key !== event.target.id
                }),
                homeworkCardCollection: this.state.homeworkCardCollection.filter(function (card) {
                    return card.key !== event.target.id
                })
            }
        );
    }

    render() {
        return (
            <div className="app">

                <Router>
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Submission Forms</Link>
                                </li>
                                <li>
                                    <Link to="/detentioncenter">Detention Center</Link>
                                </li>
                                <li>
                                    <Link to="/homeworkclub">Homework Club</Link>
                                </li>
                                <li>
                                    <Link to="/homebriding">Homebriding</Link>
                                </li>
                                <li>
                                    <Link to="/support">Support</Link>
                                </li>
                            </ul>
                        </nav>

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/detentioncenter">
                                <CardTable tableLegend="Student Serve Times" cardCollection={this.state.detentionCardCollection} callbackFunction={(event) => this.onClickRemoveCard(event)} />
                            </Route>
                            <Route path="/homeworkclub">
                                <CollectionForm collectionLegend={"Homework Club"}>
                                    <Selector configObjectValue="studentNames" arrayToMap={students} labelText="Select a student: " uniqueID={uniqid()} />
                                    <Selector configObjectValue="classSection" arrayToMap={classes} labelText="Select class of assignment: " uniqueID={uniqid()} />
                                    <DescriptionText descriptionText={"Description of assignment"} />
                                    <CallbackButton callbackFunction={() => this.onClickAddHomeworkCard()} buttonDisplayValue="Add Student" />

                                    <TableR entries={this.state.homeworkCardCollection} tableHeaders={hwcHeaders} tableLegend={"tester"} />
                                    {/*<CardTable tableLegend="Student Assignments" cardCollection={this.state.homeworkCardCollection} callbackFunction={(event) => this.onClickRemoveCard(event)} />*/}

                                </CollectionForm>

                            </Route>
                            <Route path="/homebriding">
                                <HomebridingTable students={students} tableLegend={"Homebriding 2020"} />
                            </Route>
                            <Route path="/support">        
                                <h1>Coming soon!</h1>
                            </Route>
                            <Route path="/">
                                <SubmissionHome>

                                    <div>
                                        <ul class="uk-flex-center uk-subnav uk-subnav-pill">
                                            <li><a href="#">Detention</a></li>
                                            <li><a href="#">Homework Club</a></li>
                                            <li><a href="#">Homebriding</a></li>
                                            <li><a href="#">Support Ticket</a></li>
                                        </ul>
                                    </div>

                                    <CollectionForm collectionLegend={"Detention Submission"}>
                                        <Selector configObjectValue="studentNames" arrayToMap={students} labelText="Select a student: " uniqueID={uniqid()} />
                                        <Selector configObjectValue="detentionTimes" arrayToMap={times} labelText="Select a detention time: " uniqueID={uniqid()} />
                                        <DescriptionText descriptionText={"Description of Incident"} />
                                        <CallbackButton callbackFunction={() => this.onClickAddDetentionCard()} buttonDisplayValue="Add Student" />
                                    </CollectionForm>



                                </SubmissionHome>
                            </Route>
                        </Switch>
                    </div>
                </Router>


            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
