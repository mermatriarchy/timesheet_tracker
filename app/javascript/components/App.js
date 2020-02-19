import React, { useState, useEffect } from 'react';
import TimesheetTable from './TimesheetTable';
import NewEntry from './NewEntry';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row } from 'react-bootstrap';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalBillableAmount, setTotalBillableAmount] = useState(0);
  const [checkEntries, setCheckEntries] = useState(false);
  const [error, setErrorState] = useState(false);
  // I ended up using a functioncal component at the top-level because
  // being able to hook into useEffect made it so I had to write less code
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = '/api/v1/timesheet_entries?sort_by_project=true';
      try{
        const response = await axios(apiUrl);
        setEntries(response.data.entries);
        setTotalHours(response.data['grand_totals']['total_hours']);
        setTotalBillableAmount(response.data['grand_totals']['total_billable_amount'])
        setCheckEntries(false);
      } catch (error) {
        console.log(error);
        setErrorState(true);
      }

    };
    fetchData();
  }, [checkEntries]);

  const handleNewEntry = () => {
    setCheckEntries(true);
  }

  const formattedBillableAmount = new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(totalBillableAmount);

  return(
    <Container>
        <h1>Timesheet Tracker</h1>
        { error ? (
          <div>We're sorry, an error occurred while loading the timesheet.</div>
        ) : (
          <>
          <Row className="totals-header">
            <Col>
              <h2>
                <span className="header-small grey-text">Hours Tracked</span>
                <br/>{totalHours}
              </h2>
            </Col>
            <Col>
              <h2 className="right">
                <span className="header-small grey-text">Billable Amount</span>
                <br/>{formattedBillableAmount}
              </h2>
            </Col>
          </Row>
          <TimesheetTable entries={entries}/>
          <Row>
            <NewEntry handleNewEntry={handleNewEntry}/>
          </Row>
          </>
        )}
        <footer>Submission by Hailey Miller</footer>
    </Container>
  )
    
}
