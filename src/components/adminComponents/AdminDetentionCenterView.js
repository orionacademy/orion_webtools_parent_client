import React from 'react'

class ParentDetentionCenterView extends React.Component {
    state = { detentions: [] }

    componentDidMount() {
        fetch("/api/detentionCenter", {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ studentId: "5eb0a14c8ec536f27b41a3b0" })
        })
            .then(res => res.json())
            .then(detentions => this.setState({ detentions }))
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.detentions.map(detention => <li>{"period = " + detention.period + ", reason = " + detention.reason}</li>)}
                </ul>
            </div>
        )
    }
}

export default ParentDetentionCenterView