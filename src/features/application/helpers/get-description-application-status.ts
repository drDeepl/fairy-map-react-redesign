import { ApplicationStatus } from "../constants/application-status.enum";

export function getDescriptionApplicationStatus(
  status: string
): string | undefined {
  switch (status) {
    case "SEND":
      return ApplicationStatus.SEND;
    case "SUCCESSED":
      return ApplicationStatus.SUCCESSED;
    case "CANCELLED":
      return ApplicationStatus.CANCELLED;
    default:
      return undefined;
  }
}
