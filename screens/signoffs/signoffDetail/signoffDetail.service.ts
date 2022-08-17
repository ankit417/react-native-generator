import {api} from '@src/api';

type SignoffDetailType = {
  sign_off_detail: {
    id: number;
    pdf: string;
    photos: string[];
    status: string;
    site_visits: number;
    signoff_date: string;
    time_entries: number;
    signature_photo: string;
  };
  job_details: {
    id: number;
    title: string;
    job_number: number;
    job_prefix: string;
    description: string;
  };
  employee_details: {
    id: number;
    name: string;
    email: string;
    lastname: string | null;
  };
};

type SignoffDetailResponse = {
  success: true;
  data: {
    type: string;
    message: string;
    data: SignoffDetailType;
  };
};

//Mark - getSignOffDetail
const getSignOffDetail = async ({
  signOffId,
  type,
}: {
  signOffId: number;
  type: 'job' | 'site_visit' | 'time_entry';
}): Promise<SignoffDetailResponse> => {
  const response = await api.get<SignoffDetailResponse>(
    `/api/signoff/${signOffId}?type=${type}`,
  );

  return response.data;
};

const signoffDetailService = {
  getSignOffDetail,
};

export {signoffDetailService};
export type {SignoffDetailResponse, SignoffDetailType};
