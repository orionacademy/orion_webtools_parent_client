import React from 'react'

import configValues from '../config.js';

import TableR from './TableR.js';
import TableComponent from './TableComponent.js';

import CollectionForm from './CollectionForm.js';
import DescriptionText from './DescriptionText.js';
import Selector from './Selector.js';
import CallbackButton from './CallbackButton.js';
import HomebridingTable from './HomebridingTable.js';
import DatePicker from './DatePicker.js';


//// **** INITIALIZATIONS **** ////
// sets up the uniqid hashing function for use with component id's
var uniqid = require('uniqid');

// reference values from config.js
var students = configValues.students
var times = configValues.times
var classes = configValues.classes

// headers for each type of table
var hwcHeaders = configValues.homeworkClubHeaders
var detentionHeaders = []

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}


class HomeworkClub extends React.Component {
    state = {
        homeworkEntries: [],
    }

    componentDidMount() {
        this.setState({
            dueDate: getFormattedDate(new Date())
        })
    }


    onClickAddHomeworkCard() {
        // TODO: refactor these uncontrolled components
        var qstudentName = document.querySelector('#studentNames').value
        var qclassSection = document.querySelector('#classSection').value

        var qReferenceIndex = uniqid()

        this.setState(prevState => ({
            homeworkEntries: [...prevState.homeworkEntries,
            <TableComponent
                id={uniqid()}
                referenceIndex={qReferenceIndex}
                studentName={qstudentName}
                selectorValue={qclassSection}
                description={this.state.descriptionText}
                dueDate={this.state.dueDate}
                callbackRef={(event) => this.onClickRemoveCard(event)}
            />
            ]
        }))
    }

    onClickRemoveCard(event) {
        this.setState(
            {
                homeworkEntries: this.state.homeworkEntries.filter(function (entry) {
                    return entry.props.referenceIndex !== event.target.id
                })
            }
        );
    }

    render() {
        return (
            <div>
                <CollectionForm collectionLegend={"Homework Club"}>
                    <Selector
                        configObjectValue="studentNames"
                        arrayToMap={students}
                        labelText="Select a student: "
                    />
                    <Selector configObjectValue="classSection" arrayToMap={classes} labelText="Select className of assignment: " />
                    <DescriptionText
                        callbackFunction={() => this.setState({ descriptionText: document.querySelector('#descriptionText').value })}
                        passedStateValue={this.state.descriptionText}
                        descriptionPlaceholder={"Description of assignment"}
                        passedId="descriptionText"
                    />
                    <DatePicker
                        callbackFunction={() => this.setState({ dueDate: document.querySelector('#date').value })}
                        passedStateValue={this.state.dueDate}
                    />
                    <CallbackButton callbackFunction={() => this.onClickAddHomeworkCard()} buttonDisplayValue="Add Student" />
                </CollectionForm>

                <TableR entries={this.state.homeworkEntries} tableHeaders={hwcHeaders} tableLegend={"tester"} />
            </div>
        )
    }
}

export default HomeworkClub