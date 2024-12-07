import { Components } from "@/api/schemas/client";
import { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createBook, uploadBookCover } from "../book/book.actions";
import BookInfoCardComponent from "../book/components/book-info-card.component";
import AddBookForm from "../book/components/forms/add-book.form";
import ListBookCarousel from "../book/components/list-book-carousel.component";
import { CoverUploadDto } from "../book/interfaces/cover-upload.dto";
import { ListBookState } from "../book/list-book.slice";
import { EthnicGroupListState } from "../ethnic-group/ethnic-group-list.slice";
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAudio, setBook } from "../book/book.slice";
import apiClient from "@/api/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

export interface BookInfoState {
  open: boolean;
  loadCover: boolean;
  bookItem: Components.Schemas.StoryWithImgResponseDto;
}

interface ListLanguageState {
  load: boolean;
  languages: Components.Schemas.LanguageDto[];
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

  const [selectedLanguage, setSelectedLanguage] =
    useState<Components.Schemas.LanguageDto | null>(null);

  const [languageListState, setLanguageListState] = useState<ListLanguageState>(
    {
      load: true,
      languages: [],
    }
  );

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

  const handleUploadAudio = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      if (bookState.selectedBook && selectedLanguage) {
        const formData = new FormData();
        formData.append("audio", event.target.files[0]);

        apiClient
          .AdminController_uploadAudioStory(
            {
              storyId: bookState.selectedBook.id,
              languageId: selectedLanguage?.id,
            },
            formData
          )
          .then((addedAudioResponse) => {
            dispatch(addAudio(addedAudioResponse.data));
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOnSelectLanguage = (language: Components.Schemas.LanguageDto) => {
    setSelectedLanguage(language);

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    apiClient.EthnicGroupController_getAllLanguage().then((result) => {
      setLanguageListState({ load: false, languages: result.data });
    });
  });
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
          audios={bookState.audios}
          onClose={handleCloseInfoBook}
          onUploadCover={handleOnUploadBookCover}
        >
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>добавить озвучку</DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="h-28 overflow-y-scroll">
              {languageListState.load ? (
                <Skeleton className="w-full h-16" />
              ) : (
                languageListState.languages.map((language) => (
                  <DropdownMenuItem
                    key={`lang_${language.id}`}
                    onClick={() => handleOnSelectLanguage(language)}
                  >
                    {language.name}
                  </DropdownMenuItem>
                ))
              )}

              {!languageListState.load &&
              languageListState.languages.length === 0 ? (
                <DropdownMenuItem>языки для озвучки найдены</DropdownMenuItem>
              ) : null}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </BookInfoCardComponent>
      ) : null}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="audio/*"
        onChange={handleUploadAudio}
      />
    </div>
  );
};
export default AdminStoriesPage;

// байкал или чехия хочет поехать
