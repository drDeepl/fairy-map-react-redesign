import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import AdminSidebar from "../components/admin-sidebar.component";
import { ItemSidebarAdmin } from "../interfaces/item-sidebar.interfaces";

interface AdminSidebarLayoutProps {
  children: React.ReactNode;
  onClickItemSidebar: (item: ItemSidebarAdmin) => void;
}

const AdminSidebarLayout: React.FC<AdminSidebarLayoutProps> = ({
  children,
  onClickItemSidebar,
}) => {
  return (
    <SidebarProvider>
      <AdminSidebar onClickItem={onClickItemSidebar} />
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
