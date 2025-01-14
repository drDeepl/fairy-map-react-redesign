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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setBook } from "../book/book.slice";
import apiClient from "@/api/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster, toast } from "sonner";
import { UploadIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export interface BookInfoState {
  open: boolean;
  loadCover: boolean;
  bookItem: Components.Schemas.StoryWithImgResponseDto;
}

interface ListLanguageState {
  open: boolean;
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
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [
    selectedLanguage,
    setSelectedLanguage,
  ] = useState<Components.Schemas.LanguageDto | null>(null);

  const [languageListState, setLanguageListState] = useState<ListLanguageState>(
    {
      open: false,
      load: true,
      languages: [],
    }
  );

  const handleOnClickAddBook = () => {
    setOpenAddBookForm(true);
  };

  const handleOnSubmitAddBook = async (
    values: Components.Schemas.AddStoryDto
  ) => {
    dispatch(createBook(values)).then(() => {
      handleOnCloseAddBookForm();
    });
  };

  const handleOnCloseAddBookForm = () => {
    setOpenAddBookForm(false);
  };

  const handleOnClickPreviewBook = async (
    book: Components.Schemas.StoryWithImgResponseDto
  ) => {
    console.log(book);

    dispatch(setBook(book));
    setOpenDialog(true);
  };

  const handleCloseInfoBook = () => {
    dispatch(setBook(null));
    setOpenDialog(false);
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

        try {
          // const addedAudioResponse: any =
          await apiClient.AdminController_uploadAudioStory(
            {
              storyId: bookState.selectedBook["id"],
              languageId: selectedLanguage.id,
            },
            formData
          );
        } catch (error) {
          console.error(error);
          toast.error("Ошибка при загрузке аудио");
        } finally {
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      }
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOnSelectLanguage = async (
    language: Components.Schemas.LanguageDto
  ) => {
    setSelectedLanguage(language);
    setLanguageListState((prevState) => ({ ...prevState, open: false }));

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    apiClient.EthnicGroupController_getAllLanguage().then((result) => {
      setLanguageListState({
        open: false,
        load: false,
        languages: result.data,
      });
    });
  }, []);
  return (
    <Dialog open={openDialog}>
      <div>
        <section className="mx-8">
          <ListBookCarousel
            load={listBookState.loading}
            books={listBookState.books}
            onClickBook={handleOnClickPreviewBook}
          >
            <Button
              variant="outline"
              onClick={handleOnClickAddBook}
              className="w-42 border border-ghost text-md"
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
              onSubmit={(values) => {
                toast.promise(handleOnSubmitAddBook(values), {
                  loading: "добавляю сказку",
                  success: "сказка успешно добавлена",
                });
              }}
              onCancel={handleOnCloseAddBookForm}
            />
          ) : null}
        </section>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{ className: "toast-admin-page" }}
        />
        <DialogContent className="[&>button]:hidden m-0 p-0 animate-zoom-in">
          {bookState.selectedBook ? (
            <BookInfoCardComponent
              book={bookState.selectedBook}
              onClose={handleCloseInfoBook}
              onUploadCover={handleOnUploadBookCover}
              onClickAddAudio={() => console.log("onClickAddAudio")}
              onClickAuth={() => {}}
            >
              <Popover
                open={languageListState.open}
                onOpenChange={(open) => {
                  setLanguageListState((prevState) => ({
                    ...prevState,
                    open,
                  }));
                }}
              >
                <PopoverTrigger
                  asChild
                  onClick={() =>
                    setLanguageListState((prevState) => ({
                      ...prevState,
                      open: true,
                    }))
                  }
                >
                  <UploadIcon className="size-6 self-center cursor-pointer hover:text-orange-500" />
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <p className="self-center font-semibold">
                      выберите язык для озвучки
                    </p>
                    <CommandInput
                      placeholder="начните поиск..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>языки для озвучки не найдены</CommandEmpty>
                      <CommandGroup>
                        {languageListState.load ? (
                          <Skeleton className="w-full h-16" />
                        ) : (
                          languageListState.languages.map((language) => (
                            <CommandItem
                              key={`lang_${language.id}`}
                              value={language.name}
                              onSelect={() => handleOnSelectLanguage(language)}
                            >
                              {language.name}
                            </CommandItem>
                          ))
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </BookInfoCardComponent>
          ) : null}
          <Input
            id="upload-audio__input"
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="audio/*"
            onChange={(event) => {
              toast.promise(handleUploadAudio(event), {
                loading: "добавляю озвучку",
                success: "озвучка успешно добавлена",
              });
            }}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};
export default AdminStoriesPage;
