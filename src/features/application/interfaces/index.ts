export interface ApplicationEditState {
  data: ApplicationEditData | undefined;
}

export interface ApplicationEditData {
  status: string;
  aplicationId: number;
  comment: string;
}
