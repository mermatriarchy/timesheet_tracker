import React from 'react';

export default function TimesheetEntry(props) {
  return(
    <tr>
      <td>{props.entry.project_name}</td>
      <td>{props.entry.client_name}</td>
      <td>{props.entry.total_hours}</td>
      <td>{(props.entry.total_hours) + (props.entry.billable ? ' (100%)' : ' (0%)')}</td>
      <td>{props.entry.billable_amount}</td>
    </tr>
  )
}