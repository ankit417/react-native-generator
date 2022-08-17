import {api} from '@src/api';

type AddSignoffResponse = {
  success: boolean;
  data: {
    type: string;
    message: string;
    data: {
      photos: string[];
      signature_photo: string;
      info_id: number;
      firstname: string;
      lastname: string;
      email: string;
      comment: string | null;
      job_id: number;
      site_visit_ids: number[] | null;
      time_entry_ids: number[] | null;
      created_by: number;
      pdf: string;
      id: number;
      created_at: string;
      updated_at: string;
      signoff_date: string;
      status: string;
      role: string | null;
    };
  };
};

// MARK: - addSignOff
const addSignOff = async (data: FormData): Promise<AddSignoffResponse> => {
  const response = await api.post<AddSignoffResponse>('/api/signoff', data);

  return response.data;
};

const addSignoffService = {
  addSignOff,
};

export {addSignoffService};
export type {AddSignoffResponse};
