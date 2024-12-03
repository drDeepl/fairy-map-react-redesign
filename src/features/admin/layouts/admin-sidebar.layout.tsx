import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import AdminSidebar from "../components/admin-sidebar.component";

interface AdminSidebarLayoutProps {
  children: React.ReactNode;
}

const AdminSidebarLayout: React.FC<AdminSidebarLayoutProps> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="lg:w-full md:min-w-52">
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminSidebarLayout;
