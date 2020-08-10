import React from "react";

function CallbackButton(props) {
    return (
            <button id={props.idProp} type="button" className="uk-button uk-button-primary" onClick={props.callbackFunction}>
                {props.buttonDisplayValue}
            </button>
    )
}

export default CallbackButton;