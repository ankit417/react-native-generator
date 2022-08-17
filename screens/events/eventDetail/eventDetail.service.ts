import {api} from '@src/api';

type EventDetailType = {
  job_details: {
    id: number;
    job_title: string;
    job_number: number;
    job_prefix: string | 'SMART';
  };
  address_details: {
    id: number;
    city: string;
    state: null;
    suburb: null;
    address: string;
    country: string;
    zip_code: number;
  };
  site_visit_details: {
    id: number;
    jobId: number;
    title: string;
    status: string | 'to_start';
    description: string;
    site_visit_number: number;
  };
  employee_details: {
    id: number;
    status: string;
    is_labour_complete: boolean;
  };
  events: {
    id: number;
    duration: number;
    end_date: string;
    end_time: string;
    start_date: string;
    start_time: string;
    event_title: string;
  };
  customer_details: {
    id: number;
    name: string;
  };
  timer: {
    id?: number;
    job_id?: number;
    event_id?: number;
    started_at?: string;
    started_by?: number;
  };
};

type EventDetailResponse = {
  success: true;
  data: {
    type: string;
    message: string;
    data: EventDetailType;
  };
};

//Mark - getEventDetail
const getEventDetail = async ({
  eventId,
  employeeId,
}: {
  eventId: number;
  employeeId: number;
}): Promise<EventDetailResponse> => {
  const response = await api.get<EventDetailResponse>(
    `/api/site-visit-events/${eventId}/assigned-employee/${employeeId}`,
  );

  return response.data;
};

const eventDetailService = {
  getEventDetail,
};

export {eventDetailService};
export type {EventDetailResponse, EventDetailType};
