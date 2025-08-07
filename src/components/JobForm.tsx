// src/components/JobForm.tsx

import { useState } from 'react';
import type { NewJob } from '../types/Job';

interface JobFormProps {
  onAddJob: (job: NewJob) => void;
}

export function JobForm({ onAddJob }: JobFormProps) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [notes, setNotes] = useState('');
  const [jobUrl, setJobUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!company.trim() || !position.trim()) {
      alert('Company and position are required!');
      return;
    }

    const newJob: NewJob = {
      company: company.trim(),
      position: position.trim(),
      notes: notes.trim() || undefined,
      jobUrl: jobUrl.trim() || undefined,
    };

    onAddJob(newJob);
    
    // Clear form
    setCompany('');
    setPosition('');
    setNotes('');
    setJobUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="job-form">
      <h3>Add New Job Application</h3>
      
      <div className="form-group">
        <label htmlFor="company">Company *</label>
        <input
          id="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g. Google, Microsoft, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="position">Position *</label>
        <input
          id="position"
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="e.g. Software Engineer, Product Manager, etc."
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobUrl">Job URL (optional)</label>
        <input
          id="jobUrl"
          type="url"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any additional notes about this position..."
          rows={3}
        />
      </div>

      <button type="submit" className="submit-btn">
        Add Job Application 🐗
      </button>
    </form>
  );
}