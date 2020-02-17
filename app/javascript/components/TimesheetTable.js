import React, {Component} from 'react';
import TimesheetEntry from './TimesheetEntry';
import axios from 'axios';

export default function TimesheetTable(props) {
        return(
            props.entries.map((entry) => {
                return(
                  <div key={entry.id}>
                   <TimesheetEntry entry={entry}/>
                  </div>
                )
            })
        )
}
