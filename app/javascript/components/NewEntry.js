import React from 'react';
import { Container, Col, Form, Row } from 'react-bootstrap';

export default function NewEntry(props) {
  return(
      <Container>
        <h2>Add New Timesheet Entry</h2>
        <Form>
          <Form.Row>
            <Col>
              <Form.Control placeholder="Client name" />
            </Col>
            <Col>
              <Form.Control placeholder="Project name" />
            </Col>
            <Col>
              <Form.Control placeholder="Project code" />
            </Col>
          </Form.Row>
         <Form.Row>
            <Col>
              <Form.Control placeholder="Contributor first name" />
            </Col>
            <Col>
              <Form.Control placeholder="Contibutor last name" />
            </Col>
            <Col>
              <Form.Control placeholder="Billable rate" />
            </Col>
          </Form.Row>
        </Form>
      </Container>  
  )
}