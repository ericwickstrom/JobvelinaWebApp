import { useState, useEffect } from 'react';
import { JobForm } from './components/JobForm';
import { JobList } from './components/JobList';
import type { Job, NewJob } from './types/Job';
import { getAllJobs, createJob } from './services/jobService';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllJobs()
      .then(setJobs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAddJob = async (newJob: NewJob) => {
    try {
      const createdJob = await createJob(newJob);
      setJobs(prevJobs => [...prevJobs, createdJob]);
      console.log('New job added:', createdJob);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
  };

  const handleEditJob = (jobId: string) => {
    setEditingJobId(jobId);
  };

  const handleSaveJob = (updatedJob: Job) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === updatedJob.id ? updatedJob : job
      )
    );
    setEditingJobId(null);
  };

  const handleCancelEdit = () => {
    setEditingJobId(null);
  };

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

          {loading ? (
            <p>Loading jobs...</p>
          ) : (
            <JobList
              jobs={jobs}
              onDeleteJob={handleDeleteJob}
              editingJobId={editingJobId}
              onEditJob={handleEditJob}
              onSaveJob={handleSaveJob}
              onCancelEdit={handleCancelEdit}
            />)}
        </main>
      </div>
    </div>
  );
}

export default App;