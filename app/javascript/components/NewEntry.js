import React from 'react';
import { Button, Container, Col, Form , Row, Toast} from 'react-bootstrap';
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
      showSuccesNotice: false
    }
  }

  toggleShowNotice = () => {
    this.setState((state, props) => ({ showSuccesNotice: !state }));
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
        self.setState((state, props) => ({ showSuccesNotice: true }));
        self.props.handleNewEntry(response);
      })
      .catch(function (error) {
        alert("We're sorry, an error occurred while submitting your form. Please review your information and try again.\n\n"
              + error);
        console.log(error);
      });
  }

  render(){
    const { clientName, projectName, projectCode, date, contribFirstName, contribLastName, hours, billableRate, showSuccesNotice } = this.state;
    return(
        <Container>
          <h2>Add New Timesheet Entry</h2>
          <Form  onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Client Name</Form.Label>
              <Form.Control placeholder="Client name" type="text" name="clientName" value={clientName} onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Project Name</Form.Label>
              <Form.Control placeholder="Project name" type="text" name="projectName" value={projectName} onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Project Code</Form.Label>
              <Form.Control placeholder="Project code" type="text" name="projectCode" value={projectCode} onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Date</Form.Label>
              <Form.Control placeholder="Date" type="date" name="date" value={date} onChange={this.handleUserInput}/>
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Contributor First Name</Form.Label>
              <Form.Control placeholder="Contributor first name" type="text" name="contribFirstName" value={contribFirstName} onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Contributor Last Name</Form.Label>
              <Form.Control placeholder="Contibutor last name" type="text" name="contribLastName" value={contribLastName} onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Hours</Form.Label>
              <Form.Control placeholder="Hours" type="number" name="hours" value={hours} onChange={this.handleUserInput}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>Billable Rate</Form.Label>
                <Form.Control placeholder="Billable rate" type="number" name="billableRate" value={billableRate} onChange={this.handleUserInput}/>
                <Form.Text className="text-muted">
                  Please enter 0 if entry is not billable.
                </Form.Text>
            </Form.Group>
            </Form.Row>
            <Form.Row>
              <Col md={{offset: 10}}>
                <Button type="submit">
                  Submit Entry
                </Button>
              </Col>
            </Form.Row>
          </Form>
          <div>
            <Row className="toast-parent">
              <Col className="toast-child">
                <Toast show={showSuccesNotice} onClose={this.toggleShowNotice} style={{backgroundColor: '#ffcd2b'}}>
                  <Toast.Header>
                  <strong className="mr-auto">Success!</strong>
                  </Toast.Header>
                  <Toast.Body>Entry for {clientName}'s {projectName} has been added to the timesheet.</Toast.Body>
                </Toast>
              </Col>
            </Row>
          </div>
      </Container>  
    )
  }
}
export default NewEntry;