import {api} from '@src/api';

type CreateTimerRequest = {
  startedBy: number;
  eventId: number;
  jobId: number;
};

type CreateTimerResponse = {
  success: boolean;
  data: {
    type: string;
    message: string;
    data: {
      started_at: string;
      started_by: number;
      event_id: number;
      job_id: number;
      id: number;
      created_at: string;
      updated_at: string;
    };
  };
};

// MARK: - createTimer
const createTimer = async (data: CreateTimerRequest) => {
  const response = await api.post<CreateTimerResponse>(
    '/api/on-going-events',
    data,
  );

  return response.data;
};

type DeleteTimerResponse = {
  success: boolean;
  data: {
    type: string;
    message: string;
    data: object;
  };
};

// MARK: - deleteTimer
const deleteTimer = async (timerId: number) => {
  const response = await api.delete<DeleteTimerResponse>(
    `/api/on-going-events/${timerId}`,
  );

  return response.data;
};

type CreateTimeEntryRequest = {
  date: Date;
  startTime: Date;
  endTime: Date;
  rate: number;
  assignedEmployeeId: number;
  description: string;
  isWorkComplete: boolean;
  onGoingEventId: number;
};

type CreateTimeEntryResponse = {
  success: boolean;
  data: {
    type: string;
    message: string;
    data: {
      date: string;
      start_time: string;
      end_time: string;
      rate: number;
      assigned_employee_id: number;
      duration: number;
      charge_out: number;
      chargable: number;
      uncharged: number;
      description: string;
      id: number;
      created_at: string;
      updated_at: string;
    };
  };
};

// MARK: - createTimeEntry
const createTimeEntry = async (data: CreateTimeEntryRequest) => {
  const response = await api.post<CreateTimeEntryResponse>(
    '/api/time-entry',
    data,
  );

  return response.data;
};

const timerService = {
  createTimer,
  deleteTimer,
  createTimeEntry,
};

export {timerService};
export type {
  CreateTimerRequest,
  CreateTimerResponse,
  DeleteTimerResponse,
  CreateTimeEntryRequest,
  CreateTimeEntryResponse,
};
