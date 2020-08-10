import React from 'react';

import CallbackButton from './CallbackButton.js';

function TableComponent(props) {
    return (
        <tr>
            <td>{props.studentName}</td>
            <td>{props.selectorValue}</td>
            <td>{props.description}</td>
            <td>{props.dueDate}</td>
            <CallbackButton idProp={props.referenceIndex} color="green" type="checkmark" callbackFunction={props.callbackRef} buttonDisplayValue={<span uk-icon="icon: check; ratio: 3.5" />} />
        </tr>
    )
}

export default TableComponent