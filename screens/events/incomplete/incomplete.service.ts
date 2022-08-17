import {api} from '@src/api';
import {EventDetailType} from '../eventDetail/eventDetail.service';

type IncompleteEventResponse = {
  success: true;
  data: {
    type: string;
    message: string;
    data: Array<EventDetailType>;
  };
};

const getInCompleteEvent = async () => {
  const response = await api.get<IncompleteEventResponse>(
    '/api/site-visit-events/user-events',
  );

  return response.data;
};

const incompleteService = {
  getInCompleteEvent,
};

export {incompleteService};
export type {IncompleteEventResponse};
