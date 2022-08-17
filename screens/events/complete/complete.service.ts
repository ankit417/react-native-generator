import {api} from '@src/api';

import {EventDetailType} from '../eventDetail/eventDetail.service';

type CompletedUserEventsResponse = {
  success: true;
  data: {
    type: string;
    message: string;
    data: Array<EventDetailType>;
  };
};

//Mark - getCompletedUserEvents
const getCompletedUserEvents = async () => {
  const response = await api.get<CompletedUserEventsResponse>(
    '/api/site-visit-events/completed-user-events',
  );

  return response.data;
};

const completeService = {
  getCompletedUserEvents,
};

export {completeService};
export type {CompletedUserEventsResponse};
