import React from 'react'

function CardR(props) {
    return (
        <div className="uk-card uk-card-default uk-card-body uk-width-1-1">
            <h3 className="uk-card-title">{props.studentName}</h3>
            <p>{props.displayValue}: {props.selectorValue}</p>
            <p>{props.descriptionText}</p>
        </div>
    )
}

export default CardR