import { ApplicationStatus } from "../constants/application-status.enum";

export function getDescriptionApplicationStatus(status: string): string {
  switch (status) {
    case "SEND":
      return ApplicationStatus.SEND;
    case "SUCCESSED":
      return ApplicationStatus.SUCCESSED;
    case "CANCELLED":
      return ApplicationStatus.CANCELLED;
    default:
      return "";
  }
}

export function getStyleApplicationStatus(status: string): string {
  switch (status) {
    case "SEND":
      return "border border-baby-blue-800 rounded-md bg-baby-blue-50 text-slate-800";
    case "SUCCESSED":
      return "border border-green-500 rounded-md text-green-500 bg-green-50";
    case "CANCELLED":
      return "border border-red-500 rounded-md text-red-500 bg-red-50";
    default:
      return "";
  }
}
