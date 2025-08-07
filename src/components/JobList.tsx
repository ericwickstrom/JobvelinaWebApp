import { useState } from 'react';
import type { Job } from '../types/Job';

interface JobListProps {
    jobs: Job[];
    onDeleteJob: (jobId: string) => void;
    editingJobId: string | null;
    onEditJob: (jobId: string) => void;
    onSaveJob: (job: Job) => void;
    onCancelEdit: () => void;
}

// Helper component for display mode (no export needed)
function JobDisplayCard({ job, onEdit, onDelete }: {
  job: Job;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <>
      <div className="job-header">
        <h3>{job.position}</h3>
        <div className="job-header-right">
          <span className="job-company">{job.company}</span>
          <button 
            className="edit-btn"
            onClick={onEdit}
            title="Edit job application"
          >
            ✏️
          </button>
          <button 
            className="delete-btn"
            onClick={onDelete}
            title="Delete job application"
          >
            ×
          </button>
        </div>
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
    </>
  );
}

// Helper component for edit mode (no export needed)
function JobEditForm({ job, onSave, onCancel }: {
  job: Job;
  onSave: (job: Job) => void;
  onCancel: () => void;
}) {
  const [company, setCompany] = useState(job.company);
  const [position, setPosition] = useState(job.position);
  const [notes, setNotes] = useState(job.notes || '');

  const handleSave = () => {
    const updatedJob: Job = {
      ...job,
      company,
      position,
      notes
    };
    onSave(updatedJob);
  };

  return (
    <div className="job-edit-form">
      <div className="form-group">
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
        />
      </div>
      
      <div className="form-group">
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
        />
      </div>
      
      <div className="form-group">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
          rows={3}
        />
      </div>
      
      <div className="edit-actions">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export function JobList({
    jobs,
    onDeleteJob,
    editingJobId,
    onEditJob,
    onSaveJob,
    onCancelEdit
}: JobListProps) {
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
                        {editingJobId === job.id ? (
                            <JobEditForm
                                job={job}
                                onSave={onSaveJob}
                                onCancel={onCancelEdit}
                            />
                        ) : (
                            <JobDisplayCard
                                job={job}
                                onEdit={() => onEditJob(job.id)}
                                onDelete={() => onDeleteJob(job.id)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}