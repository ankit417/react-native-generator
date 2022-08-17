import {api} from '@src/api';

type TimeEntriesType = {
  id: number;
  date: string;
  rate: number;
  duration: number;
  end_time: string;
  chargable: number;
  charge_out: number;
  start_time: string;
  description: string;
};

type TimeEntryResponseData = {
  employee_detail: {
    id: number;
    status: string;
    user_id: number;
    employee_name: string;
    site_visit_id: number;
    user_pay_rate: number;
    needs_to_return: boolean;
    total_chargable: number;
    total_charge_out: number;
    total_time_entries: number;
    total_scheduled_time: number;
    user_charge_out_rate: number;
  };
  time_entries: Array<TimeEntriesType>;
};

type TimeEntryResponse = {
  success: true;
  data: {
    type: string;
    message: string;
    data: Array<TimeEntryResponseData>;
  };
};

// MARK: - getTimeEntries
const getTimeEntries = async ({
  siteVisitId,
}: {
  siteVisitId: number;
}): Promise<TimeEntryResponse> => {
  const response = await api.get<TimeEntryResponse>(
    `/api/time-entry/site-visits/${siteVisitId}`,
  );

  return response.data;
};

type UpdateTimeEntryRequest = {
  date?: Date;
  startTime?: Date;
  endTime?: Date;
  rate?: number;
  description?: string;
};

type UpdateTimeEntryResponse = {
  success: true;
  data: {
    type: string;
    message: string;
    data: {
      id: number;
      created_at: string;
      updated_at: string;
      duration: number;
      date: string;
      assigned_employee_id: number;
      rate: number;
      chargable: number;
      uncharged: number;
      charge_out: number;
      description: string;
      start_time: string;
      end_time: string;
    };
  };
};

// MARK: - updateTimeEntry
const updateTimeEntry = async ({
  timeEntryId,
  body,
}: {
  timeEntryId: number;
  body: UpdateTimeEntryRequest;
}): Promise<UpdateTimeEntryResponse> => {
  const response = await api.patch<UpdateTimeEntryResponse>(
    `/api/time-entry/${timeEntryId}`,
    body,
  );

  return response.data;
};

const timeEntryService = {
  getTimeEntries,
  updateTimeEntry,
};

export {timeEntryService};
export type {
  TimeEntryResponse,
  TimeEntryResponseData,
  TimeEntriesType,
  UpdateTimeEntryRequest,
  UpdateTimeEntryResponse,
};
