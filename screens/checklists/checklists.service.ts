import {api} from '@src/api';

type ChecklistItem = {
  id: number;
  name: string;
  due_date: string;
  total_item: number;
  checked_item: number;
  site_visit_id: number;
};

type ChecklistItemResponse = {
  site_visit_details: {
    id: number;
    jobId: number;
    title: string;
    status: string;
    description: string;
    site_visit_number: number;
  };
  job_details: {
    id: number;
    title: string;
    siteId: number;
    jobType: string;
    createdAt: string;
    jobNumber: number;
    jobPrefix: string;
    jobStatus: string;
    customerId: number;
    description: string;
  };
  checklists: Array<ChecklistItem>;
};

type ChecklistReponse = {
  success: true;
  data: {
    type: string;
    message: string;
    data: ChecklistItemResponse;
  };
};

// MARK: - getChecklists
const getChecklists = async ({
  jobId,
  siteVisitId,
}: {
  jobId: number;
  siteVisitId: number;
}): Promise<ChecklistReponse> => {
  const response = await api.get<ChecklistReponse>(
    `/api/jobs/${jobId}/site-visits/${siteVisitId}/get-attached-checklists`,
  );

  return response.data;
};

const checklistsService = {
  getChecklists,
};

export {checklistsService};
export type {ChecklistReponse, ChecklistItemResponse, ChecklistItem};
