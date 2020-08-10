import React from "react";

function DescriptionText(props) {
    return (
        <div>
            <input
                className="uk-input uk-form-width-large uk-margin-bottom"
                onChange={props.callbackFunction}
                value={props.passedStateValue}
                id={props.passedId}
                type="text" 
                placeholder={props.descriptionPlaceholder}
            />
        </div>
    )
}

export default DescriptionText;