type IncompleteStackParamList = {
  Incomplete: undefined;
  Incomplete_Detail: {eventId: number; employeeId: number};
  Incomplete_Notes: undefined;
  Incomplete_Signoffs: {jobId: number};
  Incomplete_SignoffDetail: {signOffId: number};
  Incomplete_AddSignoff: {jobId: number};
  Incomplete_TimeEntry: {siteVisitId: number};
  Incomplete_Checklists: {jobId: number; siteVisitId: number};
  Incomplete_ChecklistDetail: {checklistId: number};
  Incomplete_FilesAndPhotos: {jobId: number};
};

export type {IncompleteStackParamList};
