import { Components } from "@/api/schemas/client";
import { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createBook,
  fetchListBooks,
  uploadBookCover,
} from "../book/book.actions";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import apiClient from "@/api/apiClient";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster, toast } from "sonner";
import { Cross1Icon, UploadIcon } from "@radix-ui/react-icons";

import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PaginationBox from "@/components/pagination.component";
import SearchBookBox from "../book/components/search-book-box.component";

export interface BookInfoState {
  open: boolean;
  loadCover: boolean;
  bookItem: Components.Schemas.StoryBookResponseDto;
}

interface ListLanguageState {
  open: boolean;
  load: boolean;
  languages: Components.Schemas.LanguageDto[];
}

// interface ListBookState {
//   load: boolean;
//   books: Components.Schemas.PageResponseDto<
//     Components.Schemas.StoryBookResponseDto
//   >;
// }

interface SelectedBookState {
  load: boolean;
  book: Components.Schemas.StoryBookResponseDto | null;
  audios: Components.Schemas.AudioStoryResponseDto[];
}

const AdminStoriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listBookState: ListBookState = useSelector(
    (state: RootState) => state.listBook
  );

  // const [listBookState, setListBookState] = useState<ListBookState>({
  //   load: true,
  //   books: {
  //     data: [],
  //     meta: {
  //       page: 1,
  //       take: 10,
  //       itemCount: 0,
  //       pageCount: 1,
  //       hasPreviousPage: false,
  //       hasNextPage: false,
  //     },
  //   },
  // });

  const ethnicGroupListState: EthnicGroupListState = useSelector(
    (state: RootState) => state.ethnicGroupList
  );

  const [bookState, setBookState] = useState<SelectedBookState>({
    load: true,
    book: null,
    audios: [],
  });

  const [openAddBookForm, setOpenAddBookForm] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [selectedLanguage, setSelectedLanguage] =
    useState<Components.Schemas.LanguageDto | null>(null);

  const [languageListState, setLanguageListState] = useState<ListLanguageState>(
    {
      open: false,
      load: true,
      languages: [],
    }
  );

  const handleOnClickPage = async (page: number) => {
    try {
      if (page === listBookState.books.meta.page) {
        return;
      }
      dispatch(fetchListBooks({ page: page, take: 10 }));
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка при загрузке книг");
    }
  };

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
    book: Components.Schemas.StoryBookResponseDto
  ) => {
    setBookState((prevState) => ({ ...prevState, book: book }));
    setOpenDialog(true);
    apiClient.paths["/api/story/{storyId}/audio/all"]
      .get({
        storyId: book.id,
      })
      .then((res) => {
        console.log(res);
        setBookState((prevState) => ({
          ...prevState,
          audios: res.data,
          load: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        setBookState((prevState) => ({
          ...prevState,
          load: false,
        }));
      });
  };

  const handleCloseInfoBook = () => {
    setBookState({
      load: true,
      book: null,
      audios: [],
    });
    setOpenDialog(false);
  };

  const handleOnUploadBookCover = async (
    dto: CoverUploadDto
  ): Promise<Components.Schemas.StoryBookResponseDto> => {
    return dispatch(uploadBookCover(dto)).unwrap();
  };

  const handleUploadAudio = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      if (bookState.book && selectedLanguage) {
        const formData = new FormData();
        formData.append("audio", event.target.files[0]);

        try {
          // const addedAudioResponse: any =
          await apiClient.paths[
            "/api/admin/story/{storyId}/language/{languageId}/audio/upload"
          ].post(
            {
              storyId: bookState.book.id,
              languageId: selectedLanguage.id,
            },
            formData
          );
          // await apiClient.AdminController_uploadAudioStory(
          //   {
          //     storyId: bookState.book["id"],
          //     languageId: selectedLanguage.id,
          //   },
          //   formData
          // );
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
      <div>
        <section className="mx-8 flex flex-col  space-y-2">
          <ListBookCarousel
            load={listBookState.loading}
            books={listBookState.books.data}
            onClickBook={handleOnClickPreviewBook}
          >
            <div className="flex jsutify-center items-center space-x-2">
              <Button
                variant="outline"
                onClick={handleOnClickAddBook}
                className="w-42 border border-ghost text-md lg:h-12"
              >
                <span className="">добавить сказку</span>
                <BookPlus />
              </Button>
              <SearchBookBox
                onClickBook={handleOnClickPreviewBook}
                variant="icon"
              />
            </div>
          </ListBookCarousel>
          <PaginationBox
            meta={listBookState.books.meta}
            onApplyPage={handleOnClickPage}
          />
        </section>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{ className: "toast-admin-page" }}
        />
        <DialogContent
          className={`[&>button]:hidden m-0 p-0 ${
            bookState.book ? "animate-zoom-in" : "animate-zoom-out"
          }`}
        >
          {bookState.book ? (
            <div>
              <Button
                className="absolute top-1 right-1"
                size="icon"
                variant="ghost"
                onClick={handleCloseInfoBook}
              >
                <Cross1Icon />
              </Button>
              <BookInfoCardComponent
                load={bookState.load}
                book={bookState.book}
                audios={bookState.audios}
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
                  <TooltipProvider delayDuration={500}>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        загрузить озвучку
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

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
                        <CommandEmpty>
                          языки для озвучки не найдены
                        </CommandEmpty>
                        <CommandGroup>
                          {languageListState.load ? (
                            <Skeleton className="w-full h-16" />
                          ) : (
                            languageListState.languages.map((language) => (
                              <CommandItem
                                key={`lang_${language.id}`}
                                value={language.name}
                                onSelect={() =>
                                  handleOnSelectLanguage(language)
                                }
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
            </div>
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
