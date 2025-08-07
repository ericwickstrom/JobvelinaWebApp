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

// Helper component for display mode
function JobDisplayCard({ job, onEdit, onDelete }: {
  job: Job;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="text-xl font-medium text-gray-800">{job.position}</h3>
        <div className="flex items-center gap-4">
          <span className="text-jobvelina-blue font-semibold text-lg">{job.company}</span>
          <button
            onClick={onEdit}
            title="Edit job application"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            title="Delete job application"
            className="bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-base font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="flex gap-6 mb-4 flex-wrap text-sm">
        <span className="text-gray-600">Status: {job.status}</span>
        <span className="text-gray-600">Applied: {job.appliedDate.toLocaleDateString()}</span>
      </div>
      
      {job.notes && (
        <div className="bg-gray-50 p-4 rounded-md mt-4">
          <span className="font-medium text-gray-800">Notes:</span> <span className="text-gray-700">{job.notes}</span>
        </div>
      )}
    </>
  );
}

// Helper component for edit mode
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
    <div className="bg-blue-50 p-6 rounded-lg border-2 border-jobvelina-blue">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-jobvelina-blue focus:border-transparent"
          />
        </div>
        
        <div>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-jobvelina-blue focus:border-transparent"
          />
        </div>
        
        <div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-jobvelina-blue focus:border-transparent resize-y"
          />
        </div>
        
        <div className="flex gap-2 justify-end pt-2">
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
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
    // Handle empty state
    if (jobs.length === 0) {
        return (
            <div className="text-center py-12 px-8 bg-gray-50 rounded-xl mt-8">
                <p className="text-gray-600 text-xl">No applications yet - add your first one above! 🚀</p>
            </div>
        );
    }

    // Render the list of jobs
    return (
        <div className="w-full max-w-4xl mt-8">
            <h2 className="text-gray-800 text-center mb-6 text-2xl font-medium">
                Your Applications ({jobs.length})
            </h2>

            <div className="flex flex-col gap-4">
                {jobs.map(job => (
                    <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 text-left transition-shadow duration-200 hover:shadow-md">
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