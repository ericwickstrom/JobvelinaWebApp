import type { Job, JobStatus } from '../types/Job';

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