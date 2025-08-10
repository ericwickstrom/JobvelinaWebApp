import { useState, useEffect } from 'react';
import { JobForm } from './components/JobForm';
import { JobList } from './components/JobList';
import { Toast } from './components/Toast';
import type { Job, NewJob } from './types/Job';
import { getAllJobs, createJob, updateJob, deleteJob } from './services/jobService';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Auto-hide after 3 seconds
  };

  // Load jobs on component mount
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const apiJobs = await getAllJobs();
        setJobs(apiJobs);
      } catch (error) {
        console.error('Error loading jobs:', error);
        showToast('Failed to load job applications', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    loadJobs();
  }, []);

  const handleAddJob = async (newJob: NewJob) => {
    try {
      const createdJob = await createJob(newJob);
      setJobs(prevJobs => [...prevJobs, createdJob]);
      showToast('Job application added successfully!', 'success');
      console.log('New job added:', createdJob);
    } catch (error) {
      console.error('Error creating job:', error);
      showToast('Failed to add job application', 'error');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
      showToast('Job application deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting job:', error);
      showToast('Failed to delete job application', 'error');
    }
  };

  const handleEditJob = (jobId: string) => {
    setEditingJobId(jobId);
  };

  const handleSaveJob = async (updatedJob: Job) => {
    try {
      const savedJob = await updateJob(updatedJob);
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === savedJob.id ? savedJob : job
        )
      );
      setEditingJobId(null);
      showToast('Job application updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating job:', error);
      showToast('Failed to update job application', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditingJobId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold leading-tight text-jobvelina-blue mb-4">
            JobVelina 🐗
          </h1>
          <p className="text-xl text-gray-500">Loading your job applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex justify-center items-start pt-8">
      <div className="w-full max-w-6xl px-8 text-center flex flex-col items-center gap-8">
        {/* Header */}
        <header className="w-full">
          <h1 className="text-5xl font-bold leading-tight text-jobvelina-blue mb-2">
            JobVelina 🐗
          </h1>
          <p className="text-xl text-gray-500">
            Your job hunt companion
          </p>
        </header>

        {/* Main Content */}
        <main className="w-full flex flex-col items-center gap-8">
          <JobForm onAddJob={handleAddJob} />

          <div className="text-center py-4 px-6 bg-blue-50 rounded-lg text-gray-700 w-full max-w-2xl">
            <p className="text-lg">Total Applications: {jobs.length}</p>
          </div>

          <JobList 
            jobs={jobs} 
            onDeleteJob={handleDeleteJob}
            editingJobId={editingJobId}
            onEditJob={handleEditJob}
            onSaveJob={handleSaveJob}
            onCancelEdit={handleCancelEdit}
          />
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default App;