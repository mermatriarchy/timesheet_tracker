import React, { useState, useEffect } from 'react';
import TimesheetTable from './TimesheetTable';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row } from 'react-bootstrap';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [sortByProject, setSortBy] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = sortByProject ? '/api/v1/timesheet_entries?sort_by_project=true' : '/api/v1/timesheet_entries';
      const result = await axios(apiUrl);
      setEntries(result.data);
    };
    fetchData();
  }, []);

  const handleSort = () => {
    setSortBy(!sortByProject);
  }

  return(
      <Container>
          <h1>Timesheet Tracker</h1>
          <Row>
            <Button onClick={handleSort}>{sortByProject ? 'View All Entries' : 'Sort By Project'}</Button>
          </Row>
          <TimesheetTable entries={entries} sortByProject={sortByProject}/>
      </Container>
  )
    
}
