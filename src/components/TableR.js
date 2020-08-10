import React from 'react';

// sets up the uniqid hashing function for use with component id's
var uniqid = require('uniqid');

function TableR(props) {
    return (
        <div className="uk-flex uk-flex-center uk-margin-right uk-margin-left">
            <table className="uk-table uk-table-striped uk-table-divider uk-table-hover ">
                <caption>
                    <legend className="uk-legend uk-margin-top">{props.tableLegend}</legend>
                </caption>
                <thead>
                    <tr id={uniqid()}>
                        {props.tableHeaders.map((propName) => <th id={uniqid()} >{propName}</th>)}
                    </tr>
                </thead>

                <tbody>
                    {props.entries.map(
                        (entry) => (entry)
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default TableR