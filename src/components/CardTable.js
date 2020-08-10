import React from "react"
import CallbackButton from "./CallbackButton.js";

function CardTable(props) {
    return (
        <div className="" style={{ border: "double 5px cyan", borderRadius: "5px" }}>
            <legend className="uk-legend uk-margin-top">{props.tableLegend}</legend>

            {props.cardCollection.map(card => (
                <div className="uk-margin-top uk-grid-match" uk-grid="true" uk-scrollspy="cls: uk-animation-slide-left">
                    <div className="uk-width-expand">{card.cardComponent}</div>

                    <div className="uk-width-1-3">
                        <CallbackButton idProp={card.key} callbackFunction={props.callbackFunction} buttonDisplayValue={<span uk-icon="icon: check; ratio: 3.5" />} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardTable