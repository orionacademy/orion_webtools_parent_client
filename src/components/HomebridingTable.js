import React from "react";

function HomebridingTable(props) {

    console.log(props.students)

    return (
        <div className="uk-flex uk-flex-center uk-margin-right uk-margin-left">
            <table className="uk-table uk-table-striped uk-table-divider uk-table-hover ">
                <caption>
                    <legend className="uk-legend uk-margin-top">{props.tableLegend}</legend>
                </caption>
                <thead>
                    <tr>
                        <th>Student Names</th>
                        <th>Hours Logged</th>
                        <th>Total Hours Earned</th>
                        <th>Hours Needed</th>
                    </tr>
                </thead>
                <tbody>
                    {props.students.map(
                        (student) => (
                            <tr>
                                <td>{student.lname + ", " + student.fname}</td>
                                <td>hours this term</td>
                                <td>{student.totalHours}</td>
                                <td>{320 - student.totalHours}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default HomebridingTable;