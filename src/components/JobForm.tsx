import { useState } from 'react';
import type { NewJob } from '../types/Job';

interface JobFormProps {
  onAddJob: (job: NewJob) => void;
}

export function JobForm({ onAddJob }: JobFormProps) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!company.trim() || !position.trim()) {
      return;
    }

    // Create new job object
    const newJob: NewJob = {
      company: company.trim(),
      position: position.trim(),
      jobUrl: jobUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    };

    // Call the parent callback
    onAddJob(newJob);

    // Reset form
    setCompany('');
    setPosition('');
    setJobUrl('');
    setNotes('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 text-left w-full max-w-2xl shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">
        Add New Job Application
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Company *
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Google, Microsoft, etc."
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-jobvelina-blue focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Position *
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="e.g. Software Engineer, Product Manager, etc."
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-jobvelina-blue focus:border-transparent transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Job URL (optional)
          </label>
          <input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-jobvelina-blue focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes about this job..."
            rows={4}
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-jobvelina-blue focus:border-transparent transition-all resize-y"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-jobvelina-blue hover:bg-jobvelina-blue-hover text-white font-medium py-3 px-6 rounded-md text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-jobvelina-blue focus:ring-offset-2"
        >
          Add Job Application
        </button>
      </form>
    </div>
  );
}