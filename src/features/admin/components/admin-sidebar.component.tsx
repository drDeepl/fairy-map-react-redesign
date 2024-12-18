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
import { MapPinnedIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RouteApp } from "@/pages/constants/route.enum";
import { Separator } from "@/components/ui/separator";
import { ExitIcon } from "@radix-ui/react-icons";

interface AdminSidebarProps {
  onClickItem: (item: ItemSidebar) => void;
  onClickExit: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  onClickItem,
  onClickExit,
}) => {
  const navigate = useNavigate();

  const handleOnClickMapBtn = () => {
    navigate(RouteApp.MapPage);
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        {/* <SidebarGroupLabel>Меню</SidebarGroupLabel> */}

        <SidebarMenu>
          <Button className="size-8" variant="outline" onClick={onClickExit}>
            <ExitIcon className="text-slate-600" />
          </Button>
        </SidebarMenu>
        <Separator />
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    variant="outline"
                    onClick={handleOnClickMapBtn}
                    className="animate-shimmer border border-ghost bg-[linear-gradient(110deg,#FCFAF6,45%,#D4E6FA,55%,#FCFAF6)] bg-[length:200%_100%] px-6 font-medium "
                  >
                    <MapPinnedIcon />
                    <span>карта</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
