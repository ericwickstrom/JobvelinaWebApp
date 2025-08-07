import type { Job } from '../types/Job';

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  // Handle empty state - if no jobs, show helpful message
  if (jobs.length === 0) {
    return (
      <div className="job-list-empty">
        <p>No applications yet - add your first one above! 🚀</p>
      </div>
    );
  }

  // Render the list of jobs
  return (
    <div className="job-list">
      <h2>Your Applications ({jobs.length})</h2>
      
      <div className="job-items">
        {jobs.map(job => (
          <div key={job.id} className="job-item">
            <div className="job-header">
              <h3>{job.position}</h3>
              <span className="job-company">{job.company}</span>
            </div>
            
            <div className="job-details">
              <span className="job-status">Status: {job.status}</span>
              <span className="job-date">Applied: {job.appliedDate.toLocaleDateString()}</span>
            </div>
            
            {job.notes && (
              <div className="job-notes">
                <strong>Notes:</strong> {job.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}