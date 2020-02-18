import React, { useState } from 'react';
import { Button, Container, Col, Form } from 'react-bootstrap';
import axios from 'axios';

export default function NewEntry() {
  const [clientName, setClientName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [date, setDate] = useState('');
  const [contribFirstName, setContribFirstName] = useState('');
  const [contribLastName, setContribLastName] = useState('');
  const [hours, setHours] = useState(0);
  const [billableRate, setBillableRate] = useState(0);

  const handleUserInput = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    switch(fieldName) {
      case "clientName":
        setClientName(value);
        break;
      case "projectName":
        setProjectName(value);
        break;
      case "projectCode":
        setProjectCode(value);
      break;
      case "date":
        setDate(value);
      break;
      case "contribFirstName":
        setContribFirstName(value);
      break;
      case "contribLastName":
        setContribLastName(value);
      break;
      case "hours":
        setHours(value);
      break;
      case "billableRate":
        setBillableRate(value);
      break;
      default:
      break;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/v1/timesheet_entries', {
       client_name: clientName,
       project_name: projectName,
       project_code: projectCode,
       date: date,
       contributor_first_name: contribFirstName,
       contributor_last_name: contribLastName,
       hours: hours,
       billable: billableRate > 0 ? true : false,
       billable_rate: billableRate
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return(
      <Container>
        <h2>Add New Timesheet Entry</h2>
        <Form  onSubmit={handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Control placeholder="Client name" type="text" name="clientName" value={clientName} onChange={handleUserInput}/>
            </Col>
            <Col>
              <Form.Control placeholder="Project name" type="text" name="projectName" value={projectName} onChange={handleUserInput}/>
            </Col>
            <Col>
              <Form.Control placeholder="Project code" type="text" name="projectCode" value={projectCode} onChange={handleUserInput}/>
            </Col>
            <Col>
              <Form.Control placeholder="Date" type="date" name="date" value={date} onChange={handleUserInput}/>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Control placeholder="Contributor first name" type="text" name="contribFirstName" value={contribFirstName} onChange={handleUserInput}/>
            </Col>
            <Col>
              <Form.Control placeholder="Contibutor last name" type="text" name="contribLastName" value={contribLastName} onChange={handleUserInput}/>
            </Col>
            <Col>
              <Form.Control placeholder="Hours" type="number" name="hours" value={hours} onChange={handleUserInput}/>
            </Col>
            <Col>
              <Form.Control placeholder="Billable rate (enter 0 if item is not billable)" type="number" name="billableRate" value={billableRate} onChange={handleUserInput}/>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={{span: 2, offset: 3}}>
              <Button type="submit">
                Submit Entry
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>  
  )
}