import {api} from '@src/api';

type ChecklistItems = {
  id: number;
  type: 'header' | 'text' | 'checkbox';
  position: number;
  checked_by: string;
  is_checked: boolean;
  description: string;
  checklist_id: number;
};

type ChecklistDetailReponse = {
  success: boolean;
  data: {
    type: string;
    message: string;
    data: {
      checklist_details: {
        id: number;
        name: string;
        due_date: string;
        created_at: string;
        template_id: number;
        site_visit_id: number | null;
      };
      total_item: string;
      checked_item: string;
      checklist_items: Array<ChecklistItems>;
    };
  };
};

// MARK: - getChecklistDetail
const getChecklistDetail = async ({
  checklistId,
}: {
  checklistId: number;
}): Promise<ChecklistDetailReponse> => {
  const response = await api.get<ChecklistDetailReponse>(
    `/api/checklists/${checklistId}`,
  );

  return response.data;
};

type CheckUncheckChecklistRequest = {
  is_checked: boolean;
};

type CheckUncheckChecklistReponse = {
  success: boolean;
  data: {
    type: string;
    message: string;
    data: {
      id: number;
      is_checked: boolean;
      checked_by: number;
      created_at: string;
      updated_at: string;
      type: string;
      description: string;
      checklist_id: number;
      position: number;
      job_id: number;
    };
  };
};

// MARK: - checkUncheckChecklist
const checkUncheckChecklist = async ({
  checklistItemId,
  body,
}: {
  checklistItemId: number;
  body: CheckUncheckChecklistRequest;
}): Promise<CheckUncheckChecklistReponse> => {
  const response = await api.patch<CheckUncheckChecklistReponse>(
    `/api/checklists/check/${checklistItemId}`,
    body,
  );

  return response.data;
};

const checklistsDetailService = {
  getChecklistDetail,
  checkUncheckChecklist,
};

export {checklistsDetailService};
export type {
  ChecklistDetailReponse,
  ChecklistItems,
  CheckUncheckChecklistRequest,
};
