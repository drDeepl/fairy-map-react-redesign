import { AppDispatch, RootState } from "@/app/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./map.component";

import { AuthState } from "../auth/auth.slice";
import AuthForm from "../auth/auth.form.component";
import ErrorMessageScreen from "@/pages/error-message.page";
import { useNavigate } from "react-router-dom";
import { getRoutePageByUserRole } from "@/common/helpers/page.helper";

import { Components } from "@/api/schemas/client";

import { addRatingAudio } from "../audio-book/audio-book.actions";

import BookInfoCardComponent from "../book/components/book-info-card.component";

import CreateApplicationAudioForm from "../application/forms/schemas/create-application-audio.form";

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
import { AxiosResponse } from "node_modules/axios/index.d.cts";

interface MapPageProps {
  width: number;
  height: number;
}

interface AuthFormState {
  open: boolean;
  notifySuccess: boolean;
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

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [authFormState, setAuthFormState] = useState<AuthFormState>({
    open: false,
    notifySuccess: false,
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
      setAuthFormState({ open: true, notifySuccess: true });
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

    const res: AxiosResponse<Components.Schemas.AddedRatingAudioStoryDto> =
      await apiClient.paths["/api/story/rating/add"].post(null, {
        audioId: audio.id,
        rating: rating,
      });

    setSelectedBook((prevState) => ({
      ...prevState,
      book: prevState.book
        ? {
            ...prevState.book,
            audios: prevState.book.audios.map(
              (audio: Components.Schemas.AudioStoryResponseDto) =>
                audio.id === res.data.audioId
                  ? { ...audio, commonRating: res.data.ratingAudioStory }
                  : audio
            ),
          }
        : null,
    }));

    return res.data.ratingAudioStory;
  };

  if (mapState.load) {
    return <LoadSpinner />;
  }

  if (mapState.error) {
    return <ErrorMessageScreen message={mapState.error.message} />;
  }

  return (
    <div className="flex flex-col">
      {authFormState.open && (
        <DialogSheet onClose={handleOnCloseAuthForm}>
          <div className="w-96">
            <AuthForm onClose={handleOnCloseAuthForm} />
          </div>
        </DialogSheet>
      )}
      {selectedBook.book && (
        <DialogSheet onClose={handleOnCloseBook} contentClassName="relative">
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
                userId={authState.user ? Number(authState.user.sub) : 0}
                onClose={() => setCurrentTab(MapModalTabs.BookInfo.toString())}
              />
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
        <MapComponent
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
