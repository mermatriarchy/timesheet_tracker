import React, {Component} from 'react';
import TimesheetEntry from './TimesheetEntry';

class TimesheetTable extends Component {
    render(){
        return(
            <div>
              <h2>this is where the table will go!</h2>
              <TimesheetEntry/>
            </div>
        )
    }
}

export default TimesheetTable;