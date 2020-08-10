import React from 'react';

function SubmissionForm(props) {
        return (
            <div className="uk-flex uk-flex-center" uk-grid="true">
                <div>
                    {props.children}
                </div>
            </div>
        );
    }

export default SubmissionForm;