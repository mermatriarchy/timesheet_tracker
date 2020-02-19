import React, {Component} from 'react';
import TimesheetEntry from './TimesheetEntry';
import { Table } from 'react-bootstrap';

export default function TimesheetTable(props) {
  return(
    <Table hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Client</th>
          <th className="right">Hours</th>
          <th className="right">Billable Hours</th>
          <th className="right">Billable Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.entries.map((entry, index) => {
          return(
            <TimesheetEntry entry={entry} key={index}/>
          )
        })}
      </tbody>
    </Table>
  )
}
