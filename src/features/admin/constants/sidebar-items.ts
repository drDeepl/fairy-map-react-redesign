import { LibraryBig, SwatchBook } from "lucide-react";
import { ItemSidebar } from "../interfaces/sidebar.interfaces";

export enum MenuItem {
  Story = "story",
  Request = "request",
}

export const menuItems: ItemSidebar[] = [
  {
    title: "сказки",
    name: MenuItem.Story,
    icon: LibraryBig,
  },
  {
    title: "заявки",
    name: MenuItem.Request,
    icon: SwatchBook,
  },
];
