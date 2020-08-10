import React from 'react'

import configValues from '../config.js';


class ParentHomeworkClubView extends React.Component {
    state = { homeworkClubs: [] }

    componentDidMount() {
        fetch(configValues.serverURL + "/api/homeworkClub", {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ studentId: "5eb0a14c8ec536f27b41a3b0" })
        })
            .then(res => res.json())
            .then(homeworkClubs => this.setState({homeworkClubs}))
    }
// this.setState({ homeworkClubs })

    render() {
        return (
            <div>
                <ul>
                    {this.state.homeworkClubs.map(clubEntry => <li>{"type = " + clubEntry.type + ", reason = " + clubEntry.reason}</li>)}
                </ul>
            </div>
        )
    }
}

export default ParentHomeworkClubView