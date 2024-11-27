import React, { useCallback, useEffect, useState } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import AddBookForm from "../book/components/forms/add-book.form";
import { BookState } from "../book/book.slice";
import { createBook } from "../book/book.actions";
import { Components } from "@/api/schemas/client";
import { fetchEthnicGroups } from "../ethnic-group/ethnic-group-list.actions";
import { EthnicGroupListState } from "../ethnic-group/ethnic-group-list.slice";

const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const bookState: BookState = useSelector((state: RootState) => state.book);
  const ethnicGroupListState: EthnicGroupListState = useSelector(
    (state: RootState) => state.ethnicGroupList
  );

  const authState = useSelector((state: RootState) => state.auth);

  const [openAddBookForm, setOpenAddBookForm] = useState<boolean>(false);

  useEffect(() => {
    console.log("admin.page");
    if (!authState.user) {
      navigate(-1);
    } else {
      dispatch(fetchEthnicGroups()).then(() => {
        console.log("ethnic groups fetched");
        setLoading(false);
      });
    }
  }, [authState.user]);

  const handleOnClickAddBook = () => {
    console.log("on click add book");
    setOpenAddBookForm(true);
  };

  const handleOnSubmitAddBook = (values: Components.Schemas.AddStoryDto) => {
    dispatch(createBook(values));
  };

  const handleOnCloseAddBookForm = () => {
    setOpenAddBookForm(false);
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

        <Button onClick={handleOnClickAddBook}>
          <BookPlus />
        </Button>

        {openAddBookForm ? (
          <AddBookForm
            open={openAddBookForm}
            errorrs={null}
            ethnicGroups={ethnicGroupListState.ethnicGroups}
            loading={bookState.loading}
            onSubmit={handleOnSubmitAddBook}
            onCancel={handleOnCloseAddBookForm}
          />
        ) : null}
      </main>
    </SidebarProvider>
  );
};

export default AdminPage;
