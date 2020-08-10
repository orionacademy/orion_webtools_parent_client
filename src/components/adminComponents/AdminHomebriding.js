import React from "react"

import Selector from "./Selector.js";
import configValues from "../config.js"


// {_id: "5e8e39d60bc7d2a215cc28c7", fname: "jill", lname: "crown", totalHours: 50}

class ParentHomebriding extends React.Component {
    state = { student: {}, hours: 15 }

    // TODO: make the properties in DB and props name match
    componentDidMount() {
        fetch('/api/singleStudent', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ studentId: this.props.studentId })
        })
            .then(res => res.json())
            .then(student => this.setState({ student }))
    }

    setMinutes() {
        this.setState({ hours: (document.querySelector("#homebridingTime").value / 60) })
    }

    updateHours() {
        fetch('api/singleStudent', {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ studentId: this.props.studentId, hoursUpdate: this.state.hours })
        })
            .then(res => res.json())
            .then(student => this.setState({student}))
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
                        <p className="uk-text-small">{this.state.student.fname + " " + this.state.student.lname} has earned {this.state.student.totalHours}/320 hours so far!</p>

                    </div>
                </div>


                <div className="">
                    <p className="uk-text-medium">Log hours:</p>
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
                    <button onClick={() => this.updateHours()} type="button" className="uk-align-right uk-margin-left uk-margin-right uk-button uk-button-primary">Submit</button>
                    <Selector
                        configObjectValue="homebridingTime"
                        arrayToMap={configValues.times}
                        labelText="Select amount of time (minutes): "
                        callbackFunction = {() => this.setMinutes()}
                    />
                </div>
            </div>
        )
    }
}

export default ParentHomebriding