import { Components } from "@/api/schemas/client";
import { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import { ReactHTMLElement, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBook, uploadBookCover } from "../book/book.actions";
import BookInfoCardComponent from "../book/components/book-info-card.component";
import AddBookForm from "../book/components/forms/add-book.form";
import ListBookCarousel from "../book/components/list-book-carousel.component";
import { CoverUploadDto } from "../book/interfaces/cover-upload.dto";
import { ListBookState } from "../book/list-book.slice";
import { EthnicGroupListState } from "../ethnic-group/ethnic-group-list.slice";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setBook } from "../book/book.slice";

export interface BookInfoState {
  open: boolean;
  loadCover: boolean;
  bookItem: Components.Schemas.StoryWithImgResponseDto;
}

const AdminStoriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listBookState: ListBookState = useSelector(
    (state: RootState) => state.listBook
  );
  const ethnicGroupListState: EthnicGroupListState = useSelector(
    (state: RootState) => state.ethnicGroupList
  );
  const bookState = useSelector((state: RootState) => state.book);

  const [openAddBookForm, setOpenAddBookForm] = useState<boolean>(false);

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
    dispatch(setBook(book));
  };

  const handleCloseInfoBook = () => {
    dispatch(setBook(null));
  };

  const handleOnUploadBookCover = async (
    dto: CoverUploadDto
  ): Promise<Components.Schemas.StoryWithImgResponseDto> => {
    return dispatch(uploadBookCover(dto)).unwrap();
  };

  const handleUploadCover = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      alert(event.target.files[0]);
    }
  };
  return (
    <div>
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
      {bookState.selectedBook ? (
        <BookInfoCardComponent
          open={bookState.selectedBook ? true : false}
          book={bookState.selectedBook}
          onClose={handleCloseInfoBook}
          onUploadCover={handleOnUploadBookCover}
        >
          <DropdownMenuItem>
            <div>
              <Label htmlFor="audio" className="cursor-pointer">
                добавить озвучку
              </Label>
              <Input
                className="hidden"
                id="audio"
                type="file"
                accept="audio/*"
                onChange={handleUploadCover}
              />
            </div>
          </DropdownMenuItem>
        </BookInfoCardComponent>
      ) : null}
    </div>
  );
};
export default AdminStoriesPage;

// байкал или чехия хочет поехать
