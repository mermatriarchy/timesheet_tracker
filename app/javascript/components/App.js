import React, { useState, useEffect } from 'react';
import TimesheetTable from './TimesheetTable';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Col, Row } from 'react-bootstrap';

export default function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = '/api/v1/timesheet_entries?sort_by_project=true';
      const response = await axios(apiUrl);
      setEntries(response.data);
    };
    fetchData();
  }, []);
 
  const handleAddEntry = () => {

  }
 
  return(
      <Container>
          <h1>Timesheet Tracker</h1>
          <Row>
            <Col md={{ offset: 10 }}>
              <Button onClick={handleAddEntry} variant="success">Add an Entry</Button>
            </Col>
          </Row>
          <TimesheetTable entries={entries}/>
      </Container>
  )
    
}
