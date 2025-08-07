import { useState } from 'react';
import './App.css';
import { JobForm } from './components/JobForm';
import type { Job, NewJob } from './types/Job';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleAddJob = (newJob: NewJob) => {
    const job: Job = {
      ...newJob,
      id: crypto.randomUUID(), // Generate unique ID
      status: 'applied',        // Default status
      appliedDate: new Date(),  // Today's date
    };

    setJobs(prevJobs => [...prevJobs, job]);
    console.log('New job added:', job); // For now, we'll log it
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>JobVelina 🐗</h1>
        <p>Your job hunt companion</p>
      </header>

      <main className="main-content">
        <JobForm onAddJob={handleAddJob} />

        <div className="job-count">
          <p>Total Applications: {jobs.length}</p>
          {jobs.length > 0 && (
            <div>
              <h4>Recent Jobs:</h4>
              {jobs.map(job => (
                <p key={job.id}>{job.company} - {job.position}</p>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;