import React from "react";

var uniqid = require('uniqid');

function Selector(props) {
    var elements = props.arrayToMap

    return (
        <div className="uk-margin">
            <label className="uk-form-label" htmlFor={props.configObjectValue}>{props.labelText}</label>
            <select onChange={props.callbackFunction} defaultValue="default" id={props.configObjectValue} className="uk-select">
                {elements.map( (element) => (
                    <option id={uniqid()} value={element}>{element}</option>
                ))}
            </select>
        </div>
    )
}

export default Selector