import React from "react"

import Selector from "./Selector.js";
import configValues from "../config.js"

import Swal from 'sweetalert2'


class ParentHomebriding extends React.Component {
    state = { student: {}, hours: 0, displayedHours: 0 }

    // TODO: make the properties in DB and props name match
    componentDidMount() {
        fetch(configValues.serverURL + "/api/singleStudent", {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ studentId: this.props.studentId })
        })
            .then(res => res.json())
            .then(student => this.setState({ student: student, displayedHours: student.totalHours }))
    }



    setHours() {
        this.setState({ hours: (document.querySelector("#homebridingTime").value) })
    }

    updateHours() {
        fetch(configValues.serverURL + "/api/singleStudent", {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ studentId: this.props.studentId, hoursUpdate: this.state.hours })
        })
            .then(res => res.json())
            .then(student => this.setState({ student: student, displayedHours: this.state.displayedHours + this.state.hours }))
            .then(
                Swal.fire({
                    title: 'Submission recieved!',
                    text: 'Thank you for your submission, you will now be logged out and see your change next time you log in.',
                    timer: 5000,
                    timerProgressBar: true,
                    onBeforeOpen: () => {
                      Swal.showLoading()
                    }
                  }).then(this.props.returnToLogin)
            )
    }

    render() {
        return (
            <div className="uk-width-1-1 uk-flex uk-flex-center" uk-grid="True">
                <div className="uk-align-center">
                    <br />
                    <br />
                    <div>
                        <p className="uk-text-lead">Example Student's homebriding Database</p>
                    </div>
                    <br />
                    <div>
                        <p className="uk-text-small">{this.state.student.fname + " " + this.state.student.lname} has earned {this.state.displayedHours}/320 hours so far!</p>
                        <p className="uk-text-small">The first term ends on 12/18/20</p>
                    </div>
                </div>


                <div className="">
                    <p className="uk-text-medium">Log Hours</p>
                    <label className="uk-margin-right" htmlFor="userName">Activity:</label>
                    <input
                        className="uk-input uk-form uk-form-width-medium uk-margin-right"
                        id="activity"
                        type="text"
                        placeholder="Activity"
                    />

                    <label className="uk-margin-right" htmlFor="pwd">Date:</label>
                    <input
                        className="uk-input uk-form uk-form-width-medium uk-margin-right"
                        id="date"
                        type="text"
                        placeholder="Date"
                    />
                    <button onClick={
                        () =>
                            Swal.fire({
                                title: 'Please Confirm Submission',
                                text: this.state.student.fname + " will be adding " + this.state.hours + " hour/s and have a total of " + (parseInt(this.state.displayedHours) + parseInt(this.state.hours)) + " hours upon submission.",
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Submit'
                            }).then((result) => {
                                if (result.value) {
                                    this.updateHours()
                                }
                            })
                    } type="button" className="uk-align-right uk-margin-left uk-margin-right uk-button uk-button-primary">Submit</button>


                    <Selector
                        configObjectValue="homebridingTime"
                        arrayToMap={configValues.times}
                        labelText="Select amount of time (hours): "
                        callbackFunction={() => this.setHours()}
                    />
                </div>
            </div>
        )
    }
}

export default ParentHomebriding