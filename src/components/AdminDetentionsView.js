import React from "react"

import TableR from './TableR.js';

import CollectionForm from './CollectionForm.js';
import DescriptionText from './DescriptionText.js';
import Selector from './Selector.js';
import CallbackButton from './CallbackButton.js';
import TableComponent from './TableComponent.js';

import HomebridingTable from './HomebridingTable.js';

import DatePicker from './DatePicker.js';
import DatePicker2 from './DatePicker2.js';

import LoginMenu from './LoginMenu.js';
import ParentView from "./ParentView.js";
import Nav from "./Nav.js";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import configValues from '../config.js';

//// **** INITIALIZATIONS **** ////
// sets up the uniqid hashing function for use with component id's
var uniqid = require('uniqid');

// reference values from config.js
//var students = configValues.students
//var students = ["Cottontail, Ralph"]
var times = configValues.times
var classes = configValues.classes
var periods = configValues.periods

// headers for each type of table
var hwcHeaders = configValues.homeworkClubHeaders
var detentionHeaders = []
var misbehaviorCategories = [
    "Inappropriate language", "Teasing", "Open computer", "Inappropriate use of computer", "Headphones on without specific permission", "Speaking out during class"
    , "Tardiness", "Name-calling", "Disruptive behavior", "Not following directions", "Failure to do a chore", "Cell Phones out or in use", "Refusal to participate", 
    "Food in a classroom", "Backpack or other materials not part of class, carried into class"
]


function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}

class AdminHomeworkClubView extends React.Component {
    state = {
        homeworkEntries: [],
        detentionEntries: [],
        dueDate: "",
        descriptionText: "",
    }

    // GET all currentHomeworkClubEntries data to populate table with and store them in state as "homeworkEntries"
    componentDidMount() {
        fetch(configValues.serverURL + "/api/adminHomeworkClub", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(homeworkEntries => this.initialTablePopulation(homeworkEntries))

        this.setState({
            dueDate: getFormattedDate(new Date())
        })
    }

    // a helper function that converts information from the 'currentHomeworkClubEntries' MongoDB collection 
    // into the initial TableComponent entries displayed by the TableR component
    initialTablePopulation(listOfEntries) {
        console.log(listOfEntries)
        // for each value (aka property) of the MongoDB document object, append a TableComponent to the list of homeworkEntries
        for (let [key, value] of Object.entries(listOfEntries)) {
            console.log(" *** value *** ", value)
            // TODO: use the entries ObjectId value as the reference index so we can delete it from DB later down the road

            this.setState(prevState => ({
                homeworkEntries: [...prevState.homeworkEntries,
                <TableComponent
                    id={uniqid()}
                    referenceIndex={value._id}
                    studentName={value.student.fname + " " + value.student.lname}
                    selectorValue={value.class}
                    description={value.description}
                    dueDate={value.date}
                    callbackRef={(event) => this.onClickRemoveCard(event)}
                />
                ]
            }))
        }
    }

    // POST a new table entry into the currentHomeworkClubEntries collection in the DB
    onClickAddHomeworkCard() {
        // splice first and last name into two seperate values
        var splicedName = document.querySelector('#studentName').value.split(', ')

        // data sent in the body to the express server for saving in MongoDB
        var data = {
            date: document.querySelector('#date').value,
            assignedBy: "Mr.Lowe",
            period: document.querySelector('#classPeriod').value,
            class: document.querySelector('#classSection').value,
            description: document.querySelector('#descriptionText').value,
            // for Mongoose to query student ObjectId 
            studentFname: splicedName[1],
            studentLname: splicedName[0]
        }

        // perform POST API operation to create a new currentHomeworkClub document in DB
        fetch(configValues.serverURL + "/api/adminHomeworkClub", {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            // use the responseObject's _id field for the TableComponent's referenceIndex property
            // we use this value in onClickRemoveCard to filter it out later
            .then(responseObject => this.additionalTablePopulation(responseObject._id))
    }

    // a helper function which adds additional TableR entries using the _id of the latest created document object
    additionalTablePopulation(responseId) {
        var splicedName = document.querySelector('#studentName').value.split(', ')

        // the TableR component needs a TableComponent appended to it as well since we now have an 
        // additonal homeworkEntry!
        this.setState(prevState => ({
            homeworkEntries: [...prevState.homeworkEntries,
            <TableComponent
                // THIS ID COULD BE A MAJOR PROBLEM FOR DELETING TABLE ENTRIES! 
                id={uniqid()}
                // THIS REFERENCE COULD BE A MAJOR PROBLEM!
                referenceIndex={responseId}
                studentName={splicedName[1] + " " + splicedName[0]}
                selectorValue={document.querySelector('#classSection').value}
                description={document.querySelector('#descriptionText').value}
                dueDate={document.querySelector('#date').value}
                callbackRef={(event) => this.onClickRemoveCard(event)}
            />
            ]
        }))
    }

    onClickRemoveCard(event) {
        // data sent in the body to the express server for saving in MongoDB
        var data = {
            referenceId: event.target.id,
        }

        console.log(event.target.id)

        // perform fetch with DELETE header
        fetch(configValues.serverURL + "/api/adminHomeworkClub", {
            method: 'DELETE',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(data)
        })
            .then(res => res.json())

        // remove the TableComponent from the current list via filter
        this.setState(
            {
                homeworkEntries: this.state.homeworkEntries.filter(function (entry) {
                    // return all entries which do not share the id of the target entry
                    return entry.props.referenceIndex !== event.target.id
                })
            }
        );
    }

    render() {
        return (
            <div>
                <CollectionForm collectionLegend={"Detentions"}>
                    <Selector
                        configObjectValue="studentName"
                        arrayToMap={this.props.students}
                        labelText="Select a student: "
                    />
                    <Selector
                        configObjectValue="classSection"
                        arrayToMap={classes}
                        labelText="Class of detention: "
                    />
                    <Selector
                        configObjectValue="classPeriod"
                        arrayToMap={periods}
                        labelText="Class period detention was issued: "
                    />
                    <Selector
                        configObjectValue="misbehaviorCategory"
                        arrayToMap={misbehaviorCategories}
                        labelText="Category of misbehavior"
                    />
                    <DatePicker
                        callbackFunction={() => this.setState({ dueDate: document.querySelector('#date').value })}
                        passedStateValue={this.state.dueDate}
                    />
                    <CallbackButton callbackFunction={() => this.onClickAddHomeworkCard()} buttonDisplayValue="Add Student" />
                </CollectionForm>

                <TableR entries={this.state.homeworkEntries} tableHeaders={hwcHeaders} tableLegend="Homework Club Entries" />
            </div >
        )
    }
}

export default AdminHomeworkClubView