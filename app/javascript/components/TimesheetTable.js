import React, {Component} from 'react';
import TimesheetEntry from './TimesheetEntry';
import { Table } from 'react-bootstrap';

export default function TimesheetTable(props) {
        return(
            <Table striped bordered hover>
              <thead>
                <tr>
                {
                  props.sortByProject ? (
                  <>
                    <th>Name</th>
                    <th>Client</th>
                    <th>Hours</th>
                    <th>Billable Hours</th>
                    <th>Billable Amount</th>
                  </>
                  ) : (
                  <>
                    <th>Project Name</th>
                    <th>Client</th>
                    <th>Hours</th>
                    <th>Billable Hours</th>
                    <th>Contributor Name</th>
                    <th>Billable Rate</th>
                  </>
                  )
                }
                </tr>
              </thead>
              <tbody>
                {props.entries.map((entry, index) => {
                  return(
                    <div key={props.sortByProject ? index : entry.id}>
                     <TimesheetEntry entry={entry}/>
                    </div>
                  )
                })}
              </tbody>
            </Table>
        )
}
