import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import AdminSidebar from "../components/admin-sidebar.component";
import { ItemSidebarAdmin } from "../interfaces/item-sidebar.interfaces";

interface AdminSidebarLayoutProps {
  onClickItemSidebar: (item: ItemSidebar) => void;
  onClickExit: () => void;
  children: React.ReactNode;
}

const AdminSidebarLayout: React.FC<AdminSidebarLayoutProps> = ({
  onClickItemSidebar,
  onClickExit,
  children,
}) => {
  return (
    <SidebarProvider>
      <AdminSidebar
        onClickItem={onClickItemSidebar}
        onClickExit={onClickExit}
      />
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
