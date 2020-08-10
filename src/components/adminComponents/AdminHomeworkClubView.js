import React from 'react'

class ParentHomeworkClubView extends React.Component {
    state = { homeworkClubs: [] }

    componentDidMount() {
        fetch("/api/detentionCenter", {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ studentId: "5eb0a14c8ec536f27b41a3b0" })
        })
            .then(res => res.json())
            .then(detentions => console.log(detentions))
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