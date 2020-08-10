import React from 'react'

import configValues from '../config.js';

import TableR from './TableR.js';
import TableComponent from './TableComponent.js';

import HomeworkClub from './HomeworkClub.js';

import CollectionForm from './CollectionForm.js';
import DescriptionText from './DescriptionText.js';
import Selector from './Selector.js';
import CallbackButton from './CallbackButton.js';
import HomebridingTable from './HomebridingTable.js';
import DatePicker from './DatePicker.js';
import LoginMenu from './LoginMenu.js';
import ParentView from "./ParentView.js";
import Nav from "./Nav.js";

import AdminHomeworkClubView from "./AdminHomeworkClubView.js";
import AdminDetentionsView from "./AdminDetentionsView.js";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

//// **** INITIALIZATIONS **** ////
// sets up the uniqid hashing function for use with component id's
var uniqid = require('uniqid');

// reference values from config.js
// var students = ["Cottontail, Ralph"]
var times = configValues.times
var classes = configValues.classes
var periods = configValues.periods

// headers for each type of table
var hwcHeaders = configValues.homeworkClubHeaders
var detentionHeaders = []

class AdminView extends React.Component {
    state = {allStudentInfo:[], students: []}

    // GET all currentHomeworkClubEntries data to populate table with and store them in state as "homeworkEntries"
    componentDidMount() {
        fetch(configValues.serverURL + "/api/fetchStudentNames", {
            method: 'GET'
        })
            .then(res => res.json())
            .then(students => this.collectStudentInfo(students))
    }

    // helper function that collects all the student info from DB 
    collectStudentInfo(listOfEntries){
        // sort all fetched data by last name of student
        listOfEntries.sort((a, b) => (a.lname > b.lname) ? 1 : -1)
        
        // grab the entire document of each student for components that need more details
        this.setState({allStudentInfo: listOfEntries})
        
        // grab the "lname" and "fname" properties of each student for components only need name data
        for (let [key, value] of Object.entries(listOfEntries)) {
            this.setState(prevState => ({
                // append those values to the list of students in state
                students: [...prevState.students, value.lname + ", " + value.fname]
            }))
        }
    }

    render() {
        return (
            <div className="App">

                <Router>

                    <Nav />

                    <Switch>
                        <Route path="/detentioncenter">
                            <AdminDetentionsView students={this.state.students}/>
                        </Route>
                    </Switch>

                    <Switch>
                        <Route path="/homeworkclub">
                            <AdminHomeworkClubView students={this.state.students}/>
                        </Route>
                    </Switch>

                    <Switch>
                        <Route path="/homebriding">
                            <CollectionForm collectionLegend={""}>
                                <HomebridingTable students={this.state.allStudentInfo} tableLegend={"Homebriding 2020"} />
                            </CollectionForm>
                        </Route>
                    </Switch>

                    <Switch>
                        <Route path="/supporttickets" >
                            <h1>Coming soon!</h1>
                        </Route>
                    </Switch>

                    <Switch>
                        <Route path="/guides" >
                            <h1>Coming soon!</h1>
                        </Route>
                    </Switch>

                    <Switch>
                        <Route path="/procedures" >
                            <h1>Coming soon!</h1>
                        </Route>
                    </Switch>

                    <Switch>
                        <Route path="/home" >
                            <h1>More data required to visualize effectively</h1>
                        </Route>
                    </Switch>

                </Router>

            </div >
        )
    }
}

export default AdminView