import React, { useState, useEffect } from 'react';
import TimesheetTable from './TimesheetTable';
import axios from 'axios';

export default function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/api/v1/timesheet_entries',
      );
      setEntries(result.data);
    };
    fetchData();
  }, []);

  return(
      <div>
          <div>Hello World!!!</div>
          <TimesheetTable entries={entries}/>
      </div>
  )
    
}
