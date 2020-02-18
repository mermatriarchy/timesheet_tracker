import React from 'react';

export default function TimesheetEntry(props) {
  const formattedBillableAmount = new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(props.entry.billable_amount);

  return(
    <tr>
      <td>{props.entry.project_name}</td>
      <td>{props.entry.client_name}</td>
      <td>{props.entry.total_project_hours}</td>
      <td>{(props.entry.total_project_hours) + (props.entry.billable ? ' (100%)' : ' (0%)')}</td>
      <td>{formattedBillableAmount}</td>
    </tr>
  )
}