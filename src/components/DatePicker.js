import React from "react";

import DatePicker2 from './DatePicker2.js';

function DatePicker(props) {
    return (
        <div>
            <DatePicker2>
                <input
                    className="uk-input uk-form-width-large uk-margin-bottom"
                    onChange={props.callbackFunction}
                    id="date"
                    type="text"
                    value={props.passedStateValue}
                />
            </DatePicker2>
        </div>
    )
}

export default DatePicker;