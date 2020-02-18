import React from 'react';
import { Button, Container, Col, Form } from 'react-bootstrap';
import axios from 'axios';

class NewEntry extends React.Component {
  constructor(){
    super();
    this.state = {
      clientName: '',
      projectName: '',
      projectCode: '',
      date: '',
      contribFirstName: '',
      contribLastName: '',
      hours: 0,
      billableRate: 0,
    }
  }

  handleUserInput = (event) => {
    const {name, value} = event.target;

    this.setState((state, props) => (
      { [name]: value})
      );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let self = this;

    axios.post('/api/v1/timesheet_entries', {
       client_name: this.state.clientName,
       project_name: this.state.projectName,
       project_code: this.state.projectCode,
       date: this.state.date,
       contributor_first_name: this.state.contribFirstName,
       contributor_last_name: this.state.contribLastName,
       hours: this.state.hours,
       billable: this.state.billableRate > 0 ? true : false,
       billable_rate: this.state.billableRate
      })
      .then(function (response) {
        self.props.handleNewEntry(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render(){
    const { clientName, projectName, projectCode, date, contribFirstName, contribLastName, hours, billableRate} = this.state;
    return(
        <Container>
          <h2>Add New Timesheet Entry</h2>
          <Form  onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Control placeholder="Client name" type="text" name="clientName" value={clientName} onChange={this.handleUserInput}/>
              </Col>
              <Col>
                <Form.Control placeholder="Project name" type="text" name="projectName" value={projectName} onChange={this.handleUserInput}/>
              </Col>
              <Col>
                <Form.Control placeholder="Project code" type="text" name="projectCode" value={projectCode} onChange={this.handleUserInput}/>
              </Col>
              <Col>
                <Form.Control placeholder="Date" type="date" name="date" value={date} onChange={this.handleUserInput}/>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Control placeholder="Contributor first name" type="text" name="contribFirstName" value={contribFirstName} onChange={this.handleUserInput}/>
              </Col>
              <Col>
                <Form.Control placeholder="Contibutor last name" type="text" name="contribLastName" value={contribLastName} onChange={this.handleUserInput}/>
              </Col>
              <Col>
                <Form.Control placeholder="Hours" type="number" name="hours" value={hours} onChange={this.handleUserInput}/>
              </Col>
              <Col>
                <Form.Control placeholder="Billable rate (enter 0 if item is not billable)" type="number" name="billableRate" value={billableRate} onChange={this.handleUserInput}/>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={{span: 2, offset: 10}}>
                <Button type="submit">
                  Submit Entry
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>  
    )
  }
}
export default NewEntry;