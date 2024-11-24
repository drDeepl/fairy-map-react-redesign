import { AppDispatch, RootState } from "@/app/store";
import LoadSpinner from "@/components/ui/load-spinner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BookHeadphones, BookPlus, LibraryBig, SwatchBook } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import AddBookForm from "../book/components/forms/add-book.form";
import { BookState } from "../book/book.slice";
import { createBook } from "../book/book.actions";
import { Components } from "@/api/client";

const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const bookState: BookState = useSelector((state: RootState) => state.book);

  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authState.user) {
      navigate(-1);
    } else {
      setLoading(false);
    }
  }, [authState.user]);

  const handleOnSubmitAddBook = (values: Components.Schemas.AddStoryDto) => {
    dispatch(createBook(values));
  };

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

  if (loading) {
    return <LoadSpinner />;
  }

  return (
    <Dialog>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
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
        <main className="flex flex-col w-full px-4">
          <SidebarTrigger className="" />
          <DialogTrigger>
            <Button>
              <BookPlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogTitle>
              <span>добавить сказку</span>
            </DialogTitle>
            <AddBookForm
              loading={bookState.loading}
              onSubmit={handleOnSubmitAddBook}
            />
          </DialogContent>
        </main>
      </SidebarProvider>
    </Dialog>
  );
};

export default AdminPage;
