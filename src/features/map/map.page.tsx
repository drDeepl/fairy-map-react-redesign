import { RootState } from "@/app/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Map from "./map.component";

import { AuthState } from "../auth/auth.slice";
import AuthForm from "../auth/auth.form.component";
import ErrorMessageScreen from "@/pages/error-message.page";
import { useNavigate } from "react-router-dom";
import { getRoutePageByUserRole } from "@/common/helpers/page.helper";

import { Components } from "@/api/schemas/client";

import BookInfoCardComponent from "../book/components/book-info-card.component";

import CreateApplicationAudioForm, {
  CreateApplicationAudioDto,
} from "../application/forms/schemas/create-application-audio.form";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";

import { MapModalTabs } from "./constants/book-info-tabs.enum";

import apiClient from "@/api/apiClient";
import { simplifyGeoJsonHelper } from "./helpers/simplify-geo-json.helper";
import { FeatureProperties } from "./map.interface";
import { FeatureCollection, Geometry } from "geojson";

import SearchBookBox from "../book/components/search-book-box.component";
import { useMediaQuery } from "react-responsive";

import DialogSheet from "@/components/dialog-sheet";
import AudioBook from "../audio-book/components/audio-book";

import NotifyContainer, {
  Notification,
} from "../../components/notificaiton.component";
import { AxiosResponse } from "axios";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import { Cross1Icon, PaperPlaneIcon, UpdateIcon } from "@radix-ui/react-icons";

import { ArrowLeftIcon, BookHeadphones } from "lucide-react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import TapableButton from "@/components/tapable-button.component";

interface MapPageProps {
  width: number;
  height: number;
}

interface AuthFormState {
  open: boolean;
}

interface LanguageListState {
  load: boolean;
  languages: Components.Schemas.LanguageDto[];
}

interface MapState {
  load: boolean;
  dataMap: FeatureCollection<Geometry, FeatureProperties> | null;
  error: { message: string } | null;
}

interface SelectedBookState {
  load: boolean;
  book: Components.Schemas.StoryBookWithAudiosResponseDto | null;
  audios: Components.Schemas.AudioStoryResponseDto[];
}

const MapPage: React.FC<MapPageProps> = ({ width, height }) => {
  const [mapState, setMapState] = useState<MapState>({
    load: true,
    dataMap: null,
    error: null,
  });

  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [languageListState, setLanguageListState] = useState<LanguageListState>(
    {
      load: true,
      languages: [],
    }
  );

  const navigate = useNavigate();

  const [authFormState, setAuthFormState] = useState<AuthFormState>({
    open: false,
  });

  const handleOnCloseAuthForm = async () => {
    setAuthFormState((prevState) => ({ ...prevState, open: false }));
  };

  const handleOnClickAvatar = async () => {
    if (authState.user) {
      const routeUserPersonalPage: string = getRoutePageByUserRole(
        authState.user.role
      );

      navigate(routeUserPersonalPage);
    } else {
      setAuthFormState({ open: true });
    }
  };

  const [selectedBook, setSelectedBook] = useState<SelectedBookState>({
    load: true,
    book: null,
    audios: [],
  });

  const handleOnClickBook = async (
    book: Components.Schemas.StoryBookWithAudiosResponseDto
  ) => {
    setSelectedBook((prevState) => ({ ...prevState, book: book, load: false }));
  };

  const handleOnCloseBook = () => {
    setSelectedBook({
      load: true,
      book: null,
      audios: [],
    });
  };

  const fetchMap = useCallback(async (): Promise<
    FeatureCollection<Geometry, FeatureProperties>
  > => {
    const features: string | null = localStorage.getItem("features");
    if (!features) {
      const response = await apiClient.paths["/api/map"].get();
      return simplifyGeoJsonHelper(response.data.data);
    } else {
      const map = JSON.parse(features);
      return map as FeatureCollection<Geometry, FeatureProperties>;
    }
  }, []);

  useEffect(() => {
    fetchMap()
      .then((result) => {
        setMapState((prevState) => ({
          ...prevState,
          load: false,
          dataMap: result,
        }));
      })
      .catch((error) => {
        console.log(error);
        setMapState((prevState) => ({
          ...prevState,
          error: { message: "ошибка при загрузке карты" },
        }));
      });

    apiClient.paths["/api/ethnic-group/language/all"]
      .get()
      .then((res: any) => {
        setLanguageListState({
          load: false,
          languages: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
        setLanguageListState({
          load: false,
          languages: [],
        });
      });
  }, []);

  const handleOnSelectSearchedBook = async (
    book: Components.Schemas.StoryBookResponseDto
  ) => {
    let audios: Components.Schemas.AudioResponseDto[] = [];
    try {
      const res = await apiClient.paths["/api/story/{storyId}/audio/all"].get({
        storyId: book.id,
      });
      audios = res.data;
    } catch (error) {
      console.log(error);
    } finally {
      handleOnClickBook({
        ...book,
        audios: audios,
      } as Components.Schemas.StoryBookWithAudiosResponseDto);
    }
  };

  const [currentTab, setCurrentTab] = useState<string>(
    MapModalTabs.BookInfo.toString()
  );

  const handleOnClickAddAudio = () => {
    setCurrentTab(MapModalTabs.AddApplicationAudio.toString());
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notify) => notify.id !== id));
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const newNotification: Notification = {
        ...notification,
        id: `notify-${Date.now()}`,
      };

      setNotifications((prevState) => [...prevState, newNotification]);
    },
    []
  );

  const handleOnClickRate = async (
    rating: number,
    audio: Components.Schemas.AudioStoryResponseDto
  ): Promise<number> => {
    if (!authState.user) {
      addNotification({
        type: "error",
        message: "для оценки озвучки необходимо авторизоваться",

        action: (
          <Button
            onClick={() => {
              handleOnClickAvatar();
              if (isMobile) {
                setDrawer((prevState) => ({ ...prevState, authForm: true }));
              }
            }}
            variant="link"
            className="m-2"
          >
            войти
          </Button>
        ),
      });
      return audio.commonRating;
    }

    const res: AxiosResponse<Components.Schemas.AddedRatingAudioStoryDto> = await apiClient.paths[
      "/api/story/rating/add"
    ].post(null, {
      audioId: audio.id,
      rating: rating,
    });

    return res.data.ratingAudioStory;
  };
  interface ApplicationAudioState {
    load: boolean;
  }

  const [applicationAudioState, setApplicationAudioState] = useState<
    ApplicationAudioState
  >({
    load: false,
  });

  const handleOnSubmitCreateApplicationAudio = async (
    dto: CreateApplicationAudioDto
  ) => {
    if (!authState.user) {
      addNotification({
        type: "error",
        message: "для добавления озвучки необходимо авторизоваться",
        action: <Button onClick={() => handleOnClickAvatar()}>войти</Button>,
      });
      return;
    }
    setApplicationAudioState((prevState) => ({ ...prevState, load: true }));
    try {
      const addedAudioResponse: any = await apiClient.paths[
        "/api/user/story/{storyId}/language/{languageId}/audio/upload"
      ].post(
        {
          storyId: dto.storyId,
          languageId: dto.languageId,
        },
        dto.audioFormData as any,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await apiClient.paths["/api/audio-story-request/add"].post(null, {
        userAudioId: addedAudioResponse.data.userAudioId,
        userId: Number(authState.user.sub),
        storyId: dto.storyId,
      });
      addNotification({
        type: "success",
        message: "заявка на озвучку отправлена и доступна в разделе мои заявки",
        action: (
          <Button
            className="my-1"
            variant="outline"
            onClick={() => {
              handleOnClickAvatar();
            }}
          >
            <span>личный кабинет</span>
          </Button>
        ),
      });
      setCurrentTab(MapModalTabs.BookInfo.toString());
    } catch (error) {
      console.log(error);
    } finally {
      setApplicationAudioState((prevState) => ({ ...prevState, load: false }));
    }
  };

  interface DrawerState {
    authForm: boolean;
    selectedBook: boolean;
  }

  const [drawer, setDrawer] = useState<DrawerState>({
    authForm: false,
    selectedBook: false,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  if (mapState.load) {
    return <LoadSpinner />;
  }

  if (mapState.error) {
    return <ErrorMessageScreen message={mapState.error.message} />;
  }

  if (isMobile) {
    return (
      <div ref={containerRef}>
        <Drawer
          container={containerRef.current}
          open={drawer.authForm}
          onOpenChange={(open) =>
            setDrawer((prevState) => ({ ...prevState, authForm: open }))
          }
          modal={true}
          dismissible={false}
        >
          <DrawerContent className="z-[100]">
            {authFormState.open && (
              <AuthForm
                onClose={() => {
                  handleOnCloseAuthForm();
                  setDrawer((prevState) => ({ ...prevState, authForm: false }));
                }}
              />
            )}
          </DrawerContent>
        </Drawer>
        <Drawer
          container={containerRef.current}
          open={drawer.selectedBook}
          onOpenChange={(open) =>
            setDrawer((prevState) => ({ ...prevState, selectedBook: open }))
          }
          modal={true}
          dismissible={false}
        >
          <DrawerContent className="h-full">
            {selectedBook.book && (
              <div className="relative">
                {notifications.length > 0 ? (
                  <NotifyContainer
                    className="absolute w-full top-1"
                    notifications={notifications}
                    onRemove={removeNotification}
                  />
                ) : null}

                <Tabs
                  defaultValue={currentTab}
                  value={currentTab}
                  className="p-1 size-full"
                >
                  <TabsContent value={MapModalTabs.BookInfo.toString()}>
                    <BookInfoCardComponent
                      load={selectedBook.load}
                      book={selectedBook.book}
                      onClickAddAudio={handleOnClickAddAudio}
                    >
                      {selectedBook.book.audios.length > 0 ? (
                        <AudioBook
                          audioBooks={selectedBook.book.audios}
                          onClickRate={handleOnClickRate}
                        />
                      ) : (
                        <p>аудиокниги не найдены</p>
                      )}
                    </BookInfoCardComponent>
                  </TabsContent>
                  <TabsContent
                    value={MapModalTabs.AddApplicationAudio.toString()}
                    className="p-0 m-0"
                  >
                    <CreateApplicationAudioForm
                      storyId={selectedBook.book.id}
                      languages={languageListState.languages}
                      onSubmit={handleOnSubmitCreateApplicationAudio}
                    >
                      <Button
                        type="button"
                        variant="secondary"
                        className="border border-ghost"
                        onClick={() => {
                          setCurrentTab(MapModalTabs.BookInfo.toString());
                        }}
                      >
                        <ArrowLeftIcon />
                        <span>назад</span>
                      </Button>
                      <Button
                        type="submit"
                        variant="secondary"
                        className="self-center [&_svg]:size-5 border shadow-md border-baby-blue-500 shadow-baby-blue-200"
                      >
                        отправить заявку
                        <PaperPlaneIcon className="-rotate-45" />
                      </Button>
                    </CreateApplicationAudioForm>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            <DrawerFooter>
              {currentTab != MapModalTabs.AddApplicationAudio.toString() && (
                <div className="flex justify-between">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      handleOnCloseBook();
                      setDrawer((prevState) => ({
                        ...prevState,
                        selectedBook: false,
                      }));
                    }}
                  >
                    <ArrowLeftIcon />

                    <span>закрыть</span>
                  </Button>
                  <Button
                    variant="secondary"
                    className="self-center [&_svg]:size-8 border shadow-md border-baby-blue-500 shadow-baby-blue-200"
                    onClick={() => {
                      if (!authState.user) {
                        addNotification({
                          type: "error",
                          message:
                            "для добавления озвучки необходимо авторизоваться",
                          action: (
                            <Button
                              variant="link"
                              className="m-2"
                              onClick={() => {
                                setDrawer((prevState) => ({
                                  ...prevState,
                                  authForm: true,
                                }));
                                handleOnClickAvatar();
                              }}
                            >
                              войти
                            </Button>
                          ),
                        });
                      } else {
                        setCurrentTab(
                          MapModalTabs.AddApplicationAudio.toString()
                        );
                      }
                    }}
                  >
                    <span>предложить озвучку</span>
                    <BookHeadphones className="" strokeWidth={1.2} />
                  </Button>
                </div>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <div className="absolute w-full flex justify-between p-4 z-[50] top-1">
          <SearchBookBox
            onClickBook={async (
              books: Components.Schemas.StoryBookResponseDto
            ) => {
              handleOnSelectSearchedBook(books);
              setDrawer((prevState) => ({ ...prevState, selectedBook: true }));
            }}
          />

          <Button
            className="self-center border rounded-full shadow-md bg-slate-50 size-12 border-baby-blue-800"
            variant="outline"
            size="icon"
            onClick={() => {
              setDrawer((prevState) => ({ ...prevState, authForm: true }));
              handleOnClickAvatar();
            }}
          >
            <span className="text-slate-700 ">
              {authState.user
                ? authState.user.email.split("@")[0][0].toUpperCase()
                : "?"}
            </span>
          </Button>
        </div>

        {/* <BottomNavigation initialTab="home">
          <NavItem
            id="search"
            icon={SearchIcon}
            label="Search"
            onClick={() => {}}
          />
        </BottomNavigation> */}

        {mapState.dataMap && (
          <Map
            features={mapState.dataMap.features}
            width={width}
            height={height}
            onClickBook={async (
              book: Components.Schemas.StoryBookWithAudiosResponseDto
            ) => {
              handleOnClickBook(book);
              setDrawer((prevState) => ({ ...prevState, selectedBook: true }));
            }}
          />
        )}
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {authFormState.open && (
        <DialogSheet
          onClose={handleOnCloseAuthForm}
          contentClassName="max-w-[24rem]"
        >
          <AuthForm onClose={handleOnCloseAuthForm} />
        </DialogSheet>
      )}
      {selectedBook.book && (
        <DialogSheet>
          {notifications.length > 0 ? (
            <NotifyContainer
              className="absolute max-w-xs right-20 top-[80%] md:top-1 md:right-[20%]"
              notifications={notifications}
              onRemove={removeNotification}
            />
          ) : null}

          <Tabs
            defaultValue={currentTab}
            value={currentTab}
            className="p-1 size-full"
          >
            <TabsContent value={MapModalTabs.BookInfo.toString()}>
              <BookInfoCardComponent
                load={selectedBook.load}
                book={selectedBook.book}
                onClickAddAudio={handleOnClickAddAudio}
                headerChildren={
                  <Button
                    className="border-gray-500"
                    variant="outline"
                    size="icon"
                    onClick={() => handleOnCloseBook()}
                  >
                    <Cross1Icon className="text-gray-500 size-8" />
                  </Button>
                }
              >
                <div className="flex space-x-2">
                  {selectedBook.book.audios.length > 0 ? (
                    <AudioBook
                      audioBooks={selectedBook.book.audios}
                      onClickRate={handleOnClickRate}
                    />
                  ) : (
                    <p>аудиокниги не найдены</p>
                  )}
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-fit h-fit">
                        <TapableButton
                          className="border rounded-md shadow-md text-slate-950 border-slate-950 size-10 [&_svg]:size-8 flex items-center justify-center"
                          onClick={() => {
                            if (!authState.user) {
                              addNotification({
                                type: "error",
                                message:
                                  "для добавления озвучки необходимо авторизоваться",
                                action: (
                                  <Button
                                    className="m-2"
                                    onClick={() => handleOnClickAvatar()}
                                  >
                                    войти
                                  </Button>
                                ),
                              });
                            } else {
                              setCurrentTab(
                                MapModalTabs.AddApplicationAudio.toString()
                              );
                            }
                          }}
                        >
                          <BookHeadphones className="" strokeWidth={1.2} />
                        </TapableButton>
                      </TooltipTrigger>
                      <TooltipContent>предложить свою озвучку</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </BookInfoCardComponent>
            </TabsContent>
            <TabsContent
              value={MapModalTabs.AddApplicationAudio.toString()}
              className="p-0 m-0"
            >
              <CreateApplicationAudioForm
                storyId={selectedBook.book.id}
                languages={languageListState.languages}
                onSubmit={handleOnSubmitCreateApplicationAudio}
              >
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-ghost"
                  onClick={() => {
                    setCurrentTab(MapModalTabs.BookInfo.toString());
                  }}
                >
                  <ArrowLeftIcon />
                  <span>назад</span>
                </Button>

                <Button
                  type="submit"
                  className="w-32 [&_svg]:size-5"
                  disabled={applicationAudioState.load}
                >
                  <span>отправить</span>
                  {applicationAudioState.load ? (
                    <UpdateIcon className="size-6 animate-spin" />
                  ) : (
                    <PaperPlaneIcon className="-rotate-45" />
                  )}
                </Button>
              </CreateApplicationAudioForm>
            </TabsContent>
          </Tabs>
        </DialogSheet>
      )}

      <div className="absolute w-full flex justify-between p-4 z-[50]">
        <SearchBookBox onClickBook={handleOnSelectSearchedBook} />

        <Button
          className="self-center border rounded-full shadow-md bg-slate-50 size-12 border-baby-blue-800"
          variant="outline"
          size="icon"
          onClick={handleOnClickAvatar}
        >
          <span className="text-slate-700 ">
            {authState.user
              ? authState.user.email.split("@")[0][0].toUpperCase()
              : "?"}
          </span>
        </Button>
      </div>

      {mapState.dataMap && (
        <Map
          features={mapState.dataMap.features}
          width={width}
          height={height}
          onClickBook={handleOnClickBook}
        />
      )}
    </div>
  );
};

export default MapPage;
