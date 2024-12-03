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
import { LibraryBig, BookHeadphones, SwatchBook } from "lucide-react";

const AdminSidebar = () => {
  const menuItems = [
    {
      title: "сказки",
      url: "#",
      icon: LibraryBig,
    },
    {
      title: "озвучки",
      url: "#",
      icon: BookHeadphones,
    },
    {
      title: "заявки",
      url: "#",
      icon: SwatchBook,
    },
  ];

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
                    <a
                      href={item.url}
                      onClick={() => console.log(`click on ${item.title}`)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
