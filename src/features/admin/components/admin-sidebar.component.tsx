import { Button } from "@/components/ui/button";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  Sidebar,
} from "@/components/ui/sidebar";
import { ItemSidebar } from "../interfaces/sidebar.interfaces";
import { menuItems } from "../constants/sidebar-items";

interface AdminSidebarProps {
  onClickItem: (item: ItemSidebar) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClickItem }) => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarGroupLabel>Меню</SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Button variant="outline" onClick={() => onClickItem(item)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
