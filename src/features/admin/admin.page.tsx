import React, { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/app/store";
import LoadSpinner from "@/components/ui/load-spinner";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookHeadphones, BookPlus, LibraryBig, SwatchBook } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import AddBookForm from "../book/components/forms/add-book.form";

import { createBook, fetchListBooks } from "../book/book.actions";
import { Components } from "@/api/schemas/client";
import { fetchEthnicGroups } from "../ethnic-group/ethnic-group-list.actions";
import { EthnicGroupListState } from "../ethnic-group/ethnic-group-list.slice";
import { ListBookState } from "../book/list-book.slice";
import { bookTableColumns } from "../book/components/table/book.table.columns";
import { DataTable } from "@/components/data-table";
import PreviewBookCardComponent from "../book/components/book-card.component";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import ListBookCarousel from "../book/components/list-book-carousel.component";

const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [openInfoBook, setOpenInfoBook] = useState<boolean>(true);

  const listBookState: ListBookState = useSelector(
    (state: RootState) => state.listBook
  );
  const ethnicGroupListState: EthnicGroupListState = useSelector(
    (state: RootState) => state.ethnicGroupList
  );

  const authState = useSelector((state: RootState) => state.auth);

  const [openAddBookForm, setOpenAddBookForm] = useState<boolean>(false);

  useEffect(() => {
    if (!authState.user) {
      navigate(-1);
    } else {
      dispatch(fetchEthnicGroups());
      dispatch(fetchListBooks());
      setLoading(false);
    }
  }, [authState.user]);

  const handleOnClickAddBook = () => {
    setOpenAddBookForm(true);
  };

  const handleOnSubmitAddBook = (values: Components.Schemas.AddStoryDto) => {
    dispatch(createBook(values));
  };

  const handleOnCloseAddBookForm = () => {
    setOpenAddBookForm(false);
  };

  const handleOnClickPreviewBook = (book: Components.Schemas.StoryDto) => {
    // TODO:
    console.error("TODO: handleOnClickPreviewBook", book);
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
      <Sidebar variant="inset">
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
      <SidebarInset className="lg:w-full md:min-w-52">
        <section className="mx-8">
          <SidebarTrigger />
          <ListBookCarousel
            load={listBookState.loading}
            books={listBookState.books}
            onClickBook={handleOnClickPreviewBook}
            onClickAddBook={handleOnClickAddBook}
          />
          {openAddBookForm ? (
            <AddBookForm
              open={openAddBookForm}
              errors={null}
              ethnicGroups={ethnicGroupListState.ethnicGroups}
              loading={listBookState.loading}
              onSubmit={handleOnSubmitAddBook}
              onCancel={handleOnCloseAddBookForm}
            />
          ) : null}
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminPage;
