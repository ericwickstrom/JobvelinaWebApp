// src/types/Job.ts

export interface Job {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  applicationDate: Date;
  notes?: string;
  jobUrl?: string;
}

export type JobStatus = 
  | 'applied' 
  | 'interview' 
  | 'rejected' 
  | 'offer' 
  | 'withdrawn';

export interface NewJob {
  company: string;
  position: string;
  notes?: string;
  jobUrl?: string;
}