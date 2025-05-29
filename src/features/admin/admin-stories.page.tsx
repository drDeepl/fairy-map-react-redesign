import { Components } from "@/api/schemas/client";
import { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { BookHeadphones, BookPlus } from "lucide-react";
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
import PaginationBox from "@/components/pagination.component";
import SearchBookBox from "../book/components/search-book-box.component";
import { useMediaQuery } from "react-responsive";

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

interface SelectedBookState {
  load: boolean;
  book: Components.Schemas.StoryBookResponseDto | null;
  audios: Components.Schemas.AudioStoryResponseDto[];
}

import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import DialogSheet from "@/components/dialog-sheet";
import AudioBook from "../audio-book/components/audio-book";
import TapableButton from "@/components/tapable-button.component";

const AdminStoriesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listBookState: ListBookState = useSelector(
    (state: RootState) => state.listBook
  );

  const isMobile = useMediaQuery({ maxWidth: 767 });

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
    setOpenDialog(true);
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
    setOpenDialog(false);
  };

  const handleOnClickPreviewBook = async (
    book: Components.Schemas.StoryBookResponseDto
  ) => {
    setBookState((prevState) => ({ ...prevState, book: book }));
    setOpenDialog(true);
    try {
      const res = await apiClient.paths["/api/story/{storyId}/audio/all"].get({
        storyId: book.id,
      });
      console.log(res);
      setBookState((prevState) => ({
        ...prevState,
        audios: res.data,
        load: false,
      }));
    } catch {
      setBookState((prevState) => ({
        ...prevState,
        load: false,
      }));
    }
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
          await apiClient.paths[
            "/api/admin/story/{storyId}/language/{languageId}/audio/upload"
          ].post(
            {
              storyId: bookState.book.id,
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
    apiClient.EthnicGroupController_getAllLanguage().then((result: any) => {
      setLanguageListState({
        open: false,
        load: false,
        languages: result.data,
      });
    });
  }, []);

  if (isMobile) {
    return (
      <Drawer open={openDialog} handleOnly={false} dismissible={false}>
        <DrawerContent className="min-w-full min-h-full">
          <div className="absolute bottom-[15%] px-4 w-full">
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
              />
            ) : null}
          </div>

          {bookState.book ? (
            <BookInfoCardComponent
              load={bookState.load}
              book={bookState.book}
              onUploadCover={handleOnUploadBookCover}
              onClickAddAudio={() => console.log("onClickAddAudio")}
            >
              <span></span>
            </BookInfoCardComponent>
          ) : null}

          <DrawerFooter>
            <Separator />
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="w-24 border border-baby-blue-800 bg-slate-200 text-slate-800 text-md"
                onClick={handleCloseInfoBook}
              >
                закрыть
              </Button>
              {bookState.book ? (
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
                    <Button
                      variant="outline"
                      className="bg-slate-100 border border-slate-800 place-self-center [&_svg]:size-6 text-md"
                    >
                      <span>загрузить озвучку</span>
                      <UploadIcon className="text-slate-800" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="px-0">
                    <Command>
                      <p className="w-full font-semibold text-center text-md">
                        выберите язык для озвучки
                      </p>
                      <CommandInput
                        placeholder="начните поиск..."
                        className="h-9"
                      />
                      <CommandList className="px-0">
                        <CommandEmpty className="text-center text-md">
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
                                className="flex flex-col items-start text-md"
                              >
                                <Separator />
                                <span>{language.name}</span>
                              </CommandItem>
                            ))
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              ) : null}
            </div>
          </DrawerFooter>
        </DrawerContent>

        <section className="flex flex-col space-y-2">
          <ListBookCarousel
            load={listBookState.loading}
            books={listBookState.books.data}
            onClickBook={handleOnClickPreviewBook}
          >
            <div className="flex items-center space-x-2 jsutify-center">
              <Button
                variant="outline"
                onClick={handleOnClickAddBook}
                className="border w-42 border-ghost text-md lg:h-12"
              >
                <span className="">добавить сказку</span>
                <BookPlus />
              </Button>
              <SearchBookBox onClickBook={handleOnClickPreviewBook} />
            </div>
          </ListBookCarousel>
          <PaginationBox
            meta={listBookState.books.meta}
            onApplyPage={handleOnClickPage}
          />
        </section>
      </Drawer>
    );
  }

  return (
    <div>
      <section className="flex flex-col mx-8 space-y-2">
        <ListBookCarousel
          load={listBookState.loading}
          books={listBookState.books.data}
          onClickBook={handleOnClickPreviewBook}
        >
          <div className="flex items-center space-x-2 jsutify-center">
            <Button
              variant="outline"
              onClick={handleOnClickAddBook}
              className="border w-42 border-ghost text-md lg:h-12"
            >
              <span className="">добавить сказку</span>
              <BookPlus />
            </Button>
            <SearchBookBox onClickBook={handleOnClickPreviewBook} />
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
      {openDialog && (
        <DialogSheet>
          {openAddBookForm ? (
            <div className="px-4 py-6">
              <Button
                size="icon"
                variant="ghost"
                className="text-slate-500 absolute top-[1%] right-[1%]"
                onClick={handleOnCloseAddBookForm}
              >
                <Cross1Icon />
              </Button>
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
              />
            </div>
          ) : null}

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
                onUploadCover={handleOnUploadBookCover}
                onClickAddAudio={() => console.log("onClickAddAudio")}
              >
                <div>
                  {bookState.audios.length > 0 ? (
                    <div className="flex items-start space-x-2">
                      <AudioBook
                        audioBooks={bookState.audios}
                        onError={(msg) => console.log(msg)}
                      />
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
                                onClick={() =>
                                  setLanguageListState((prevState) => ({
                                    ...prevState,
                                    open: true,
                                  }))
                                }
                              >
                                <TapableButton className="border rounded-md shadow-md text-slate-950 border-slate-950 size-10 [&_svg]:size-8 flex items-center justify-center self-start">
                                  <BookHeadphones
                                    className=""
                                    strokeWidth={1.2}
                                  />
                                </TapableButton>
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
                                  languageListState.languages.map(
                                    (language) => (
                                      <CommandItem
                                        key={`lang_${language.id}`}
                                        value={language.name}
                                        onSelect={() =>
                                          handleOnSelectLanguage(language)
                                        }
                                      >
                                        {language.name}
                                      </CommandItem>
                                    )
                                  )
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                  ) : (
                    <p className="text-lg text-slate-500">
                      аудиокниги не найдены
                    </p>
                  )}
                </div>
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
        </DialogSheet>
      )}
    </div>
  );
};
export default AdminStoriesPage;
