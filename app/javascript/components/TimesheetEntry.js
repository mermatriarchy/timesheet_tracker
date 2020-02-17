import React from 'react';

export default function TimesheetEntry(props) {
        return(
            <div>
                <span>{props.entry.project_name}</span>
            </div>
        )
}