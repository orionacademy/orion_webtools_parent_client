import React from "react";


function CollectionForm(props) {
    return (
        <div className="uk-flex uk-flex-center" uk-grid="true">
            <div>
                
                    <fieldset className="uk-fieldset">

                        <legend className="uk-legend uk-margin-top">{props.collectionLegend}</legend>

                        {props.children}

                    </fieldset>
                
            </div>
        </div>
    )
}

export default CollectionForm;