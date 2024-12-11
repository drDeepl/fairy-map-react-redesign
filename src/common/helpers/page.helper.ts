import { RouteApp } from "@/pages/constants/route.enum";
import { RoleUser } from "../constants/user-role.enum";

export function getRoutePageByUserRole(role: string): string {
  switch (role) {
    case RoleUser.User:
      return RouteApp.UserPage;
    case RoleUser.Admin:
      return RouteApp.AdminPage;
    default:
      return "";
  }
}
