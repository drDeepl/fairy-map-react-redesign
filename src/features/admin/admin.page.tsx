import { Components } from "@/api/schemas/client";
import React, { useCallback, useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/app/store";
import LoadSpinner from "@/components/ui/load-spinner";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AddBookForm from "../book/components/forms/add-book.form";

import { createBook, fetchListBooks } from "../book/book.actions";

import { fetchEthnicGroups } from "../ethnic-group/ethnic-group-list.actions";
import { EthnicGroupListState } from "../ethnic-group/ethnic-group-list.slice";
import { ListBookState } from "../book/list-book.slice";

import ListBookCarousel from "../book/components/list-book-carousel.component";

import AdminSidebarLayout from "./layouts/admin-sidebar.layout";

import BookInfoCardComponent from "../book/components/book-info-card.component";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";

interface BookInfoState {
  open: boolean;
  bookItem: Components.Schemas.StoryWithImgResponseDto;
}

const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const listBookState: ListBookState = useSelector(
    (state: RootState) => state.listBook
  );
  const ethnicGroupListState: EthnicGroupListState = useSelector(
    (state: RootState) => state.ethnicGroupList
  );
  const authState = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState<boolean>(true);
  const [bookInfo, setBookInfo] = useState<BookInfoState | null>(null);
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

  const handleOnClickPreviewBook = (
    book: Components.Schemas.StoryWithImgResponseDto
  ) => {
    // TODO:
    setBookInfo((prevState) => ({ ...prevState, open: true, bookItem: book }));
    console.error("TODO: handleOnClickPreviewBook", book);
  };
  const handleCloseInfoBook = () => {
    setBookInfo(null);
  };
  if (loading) {
    return <LoadSpinner />;
  }

  return (
    <AdminSidebarLayout>
      <section className="mx-8">
        <ListBookCarousel
          load={listBookState.loading}
          books={listBookState.books}
          onClickBook={handleOnClickPreviewBook}
        >
          <Button
            variant="secondary"
            onClick={handleOnClickAddBook}
            className="w-36 border border-slate-500"
          >
            <span className="">добавить сказку</span>
            <BookPlus />
          </Button>
        </ListBookCarousel>
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
      {bookInfo ? (
        <BookInfoCardComponent
          open={bookInfo.open}
          book={bookInfo.bookItem}
          onClose={handleCloseInfoBook}
        />
      ) : null}
    </AdminSidebarLayout>
  );
};

export default AdminPage;
