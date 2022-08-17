import {api} from '@src/api';

type FilePhotosResponse = {
  success: boolean;
  data: {
    type: string;
    message: string;
    data: {
      job_id: number;
      files: Array<string>;
      type: string;
      id: number;
      created_at: string;
      updated_at: string;
      quote_id: number | null;
    };
  };
};

// MARK: - postFilePhotos
const postFilePhotos = async ({
  jobId,
  data,
}: {
  jobId: number;
  data: FormData;
}) => {
  const response = await api.post<FilePhotosResponse>(
    `/api/files/${jobId}/addfile`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

const filePhotoService = {
  postFilePhotos,
};

export {filePhotoService};
export type {FilePhotosResponse};
