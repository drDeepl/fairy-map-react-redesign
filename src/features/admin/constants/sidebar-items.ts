import { LibraryBig, SwatchBook } from "lucide-react";
import { ItemSidebarAdmin } from "../interfaces/item-sidebar.interfaces";

export enum MenuItemAdmin {
  Story = "story",
  Request = "request",
}

export const menuItems: ItemSidebarAdmin[] = [
  {
    title: "сказки",
    name: MenuItemAdmin.Story,
    icon: LibraryBig,
  },
  {
    title: "заявки",
    name: MenuItemAdmin.Request,
    icon: SwatchBook,
  },
];
