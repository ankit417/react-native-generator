import {api} from '@src/api';

type SignoffDetailResponse = {
  employee_details: {id: number; lastname: string; name: string};
  sign_off_detail: {
    id: number;
    pdf: string;
    photos: string[];
    signature_photo: string;
    signoff_date: string;
    status: string;
    time_entries: number;
    site_visits: number;
  };
  job_details: {
    id: number;
    title: string;
    job_number: number;
    job_prefix: string;
    description: string;
  };
};
type SignoffResponse = {
  success: true;
  data: {
    type: string;
    message: string;
    data: Array<SignoffDetailResponse>;
  };
};

// MARK: - getSignoffs
const getSignoffs = async ({
  jobId,
  type,
}: {
  jobId: number;
  type: 'job' | 'site_visit' | 'time_entry';
}): Promise<SignoffResponse> => {
  const response = await api.get<SignoffResponse>(
    `/api/signoff/job/${jobId}?type=${type}`,
  );

  return response.data;
};

const signoffsService = {
  getSignoffs,
};

export {signoffsService};
export type {SignoffResponse, SignoffDetailResponse};
