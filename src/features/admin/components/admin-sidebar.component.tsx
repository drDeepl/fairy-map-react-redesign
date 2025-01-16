import { Button } from "@/components/ui/button";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  Sidebar,
} from "@/components/ui/sidebar";
import { ItemSidebarAdmin } from "../interfaces/item-sidebar.interfaces";
import { menuItems } from "../constants/sidebar-items";
import { MapPinnedIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RouteApp } from "@/pages/constants/route.enum";
import { Separator } from "@/components/ui/separator";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminSidebarProps {
  onClickItem: (item: ItemSidebarAdmin) => void;
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
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        {/* <SidebarGroupLabel>Меню</SidebarGroupLabel> */}

        <SidebarMenu>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="size-8"
                  variant="outline"
                  onClick={onClickExit}
                >
                  <ExitIcon className="text-slate-600" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>выйти</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </SidebarMenu>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton asChild>
                        <Button
                          variant="outline"
                          onClick={() => onClickItem(item)}
                          className="flex justify-start"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Button>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Button
                        variant="outline"
                        onClick={handleOnClickMapBtn}
                        className="flex justify-start animate-shimmer border border-ghost bg-[linear-gradient(110deg,#FCFAF6,45%,#D4E6FA,55%,#FCFAF6)] bg-[length:200%_100%] font-medium "
                      >
                        <MapPinnedIcon />
                        <span>карта</span>
                      </Button>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">карта</TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
