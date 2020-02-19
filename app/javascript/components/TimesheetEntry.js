import React from 'react';

export default function TimesheetEntry(props) {
  const formattedBillableAmount = new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(props.entry.billable_amount);

  return(
    <tr>
      <td className="blue-text">{props.entry.project_name}</td>
      <td className="blue-text">{props.entry.client_name}</td>
      <td className="right blue-text">{props.entry.total_project_hours}</td>
      <td className="right">{ props.entry.billable ? props.entry.total_project_hours : '0 '}
                            <span className="grey-text">{(props.entry.billable ? ' (100%)' : '(0%)')}</span>
                            </td>
      <td className="right">{props.entry.billable ? formattedBillableAmount : '—'}</td>
    </tr>
  )
}