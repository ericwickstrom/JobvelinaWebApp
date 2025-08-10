import type { Job, JobStatus, NewJob } from '../types/Job';

const API_BASE_URL = 'http://localhost:5072/api';

interface ApiJob {
    id: string;
    company: string;
    position: string;
    status: string;
    applicationDate: string;
    description?: string;
    jobPostingUrl?: string;
}

const mapStatus = (apiStatus: any): JobStatus => {
    // Handle if it's a number (enum value)
    if (typeof apiStatus === 'number') {
        switch (apiStatus) {
            case 1: return 'applied';
            case 2: return 'interview';
            case 3: return 'offer';
            case 4: return 'rejected';
            case 5: return 'withdrawn';
            default: return 'applied';
        }
    }

    // Handle if it's a string
    switch (String(apiStatus).toLowerCase()) {
        case 'applied': return 'applied';
        case 'interview': return 'interview';
        case 'rejected': return 'rejected';
        case 'offer': return 'offer';
        case 'withdrawn': return 'withdrawn';
        default: return 'applied';
    }
};

const statusToEnum = (status: JobStatus): number => {
    switch (status) {
        case 'applied': return 1;
        case 'interview': return 2;
        case 'offer': return 3;
        case 'rejected': return 4;
        case 'withdrawn': return 5;
        default: return 1;
    }
};

export const getAllJobs = async (): Promise<Job[]> => {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    const apiJobs: ApiJob[] = await response.json();

    return apiJobs.map(job => ({
        id: job.id,
        company: job.company,
        position: job.position,
        status: mapStatus(job.status),
        applicationDate: new Date(job.applicationDate),
        notes: job.description,
        jobUrl: job.jobPostingUrl
    }));
};

export const createJob = async (newJob: NewJob): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            company: newJob.company,
            position: newJob.position,
            status: statusToEnum('applied'),
            applicationDate: new Date().toISOString(),
            description: newJob.notes,
            jobPostingUrl: newJob.jobUrl
        })
    });

    if (!response.ok) throw new Error('Failed to create job');
    const apiJob: ApiJob = await response.json();

    return {
        id: apiJob.id,
        company: apiJob.company,
        position: apiJob.position,
        status: mapStatus(apiJob.status),
        applicationDate: new Date(apiJob.applicationDate),
        notes: apiJob.description,
        jobUrl: apiJob.jobPostingUrl
    };
};

export const updateJob = async (job: Job): Promise<Job> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: job.id,
            company: job.company,
            position: job.position,
            status: statusToEnum(job.status),
            applicationDate: job.applicationDate.toISOString(),
            description: job.notes,
            jobPostingUrl: job.jobUrl
        })
    });

    if (!response.ok) throw new Error('Failed to update job');
    const apiJob: ApiJob = await response.json();

    return {
        id: apiJob.id,
        company: apiJob.company,
        position: apiJob.position,
        status: mapStatus(apiJob.status),
        applicationDate: new Date(apiJob.applicationDate),
        notes: apiJob.description,
        jobUrl: apiJob.jobPostingUrl
    };
};

export const deleteJob = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete job');
};