type CompleteStackParamList = {
  Complete: undefined;
  Complete_Detail: {eventId: number; employeeId: number};
  Complete_Notes: undefined;
  Complete_Signoffs: {jobId: number};
  Complete_SignoffDetail: {signOffId: number};
  Complete_AddSignoff: {jobId: number};
  Complete_TimeEntry: {siteVisitId: number};
  Complete_Checklists: {jobId: number; siteVisitId: number};
  Complete_ChecklistDetail: {checklistId: number};
  Complete_FilesAndPhotos: {jobId: number};
};

export type {CompleteStackParamList};
