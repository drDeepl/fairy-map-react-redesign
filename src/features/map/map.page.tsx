import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { BookInfoTabs } from "./constants/book-info-tabs.enum";
import { ToastContainer } from "react-toastify";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import AudioBookPlayer from "../audio-book/audio-book-player.component";
import { Cross1Icon } from "@radix-ui/react-icons";
import apiClient from "@/api/apiClient";
import { simplifyGeoJsonHelper } from "./helpers/simplify-geo-json.helper";
import { FeatureProperties } from "./map.interface";
import { FeatureCollection, Geometry } from "geojson";

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
  book: Components.Schemas.StoryWithImgResponseDto | null;
  audios: Components.Schemas.AudioStoryResponseDto[];
  text: string;
}

const MapPage: React.FC<MapPageProps> = ({ width, height }) => {
  const [mapState, setMapState] = useState<MapState>({
    load: true,
    dataMap: null,
    error: { message: "" },
  });

  const authState: AuthState = useSelector((state: RootState) => state.auth);

  const [languageListState, setLanguageListState] = useState<LanguageListState>(
    {
      load: true,
      languages: [],
    }
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [load, setLoad] = useState<boolean>(true);

  const [ethnicGroupInputValue, setEthnicGroupInputValue] = useState<string>(
    ""
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEthnicGroupInputValue(event.target.value);
  };

  const [authFormState, setAuthFormState] = useState<AuthFormState>({
    open: false,
    notifySuccess: false,
  });

  const handleOnCloseAuthForm = async () => {
    setOpenDialog(false);
    setAuthFormState((prevState) => ({ ...prevState, open: false }));
  };

  const handleOnClickAvatar = async () => {
    if (authState.user) {
      const routeUserPersonalPage: string = getRoutePageByUserRole(
        authState.user.role
      );

      navigate(routeUserPersonalPage);
    } else {
      setOpenDialog(true);
      setAuthFormState({ open: true, notifySuccess: true });
    }
  };

  const [
    selectedAudioBook,
    setSelectedAudioBook,
  ] = useState<Components.Schemas.PreviewAudioStoryResponseDto | null>(null);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOnClickAudioBook = (
    audio: Components.Schemas.PreviewAudioStoryResponseDto
  ) => {
    setSelectedAudioBook(audio);
  };

  const handleOnClickRate = async (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ): Promise<Components.Schemas.AddedRatingAudioStoryDto | undefined> => {
    return await dispatch(addRatingAudio(dto)).unwrap();
  };

  const [selectedBook, setSelectedBook] = useState<SelectedBookState>({
    load: true,
    book: null,
    text: "текст не найден",
    audios: [],
  });

  const handleOnClickBook = async (
    book: Components.Schemas.StoryWithImgResponseDto
  ) => {
    setSelectedBook((prevState) => ({ ...prevState, book: book }));
    setOpenDialog(true);
    Promise.all([
      apiClient.paths["/api/story/text/{storyId}"].get(book.id),
      apiClient.paths["/api/story/{storyId}/audio/all"].get({
        storyId: book.id,
      }),
    ])
      .then((values) => {
        console.log(values);
        setSelectedBook((prevState) => ({
          ...prevState,
          text: values[0].data.text,
          audios: values[1].data,
          load: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        setSelectedBook((prevState) => ({
          ...prevState,
          load: false,
        }));
      });
  };

  const handleOnCloseBook = async () => {
    setOpenDialog(false);

    setSelectedBook({
      load: true,
      text: "текст не найден",
      book: null,
      audios: [],
    });
  };

  useEffect(() => {
    const features: string | null = localStorage.getItem("features");
    if (!features) {
      apiClient.paths["/api/map"]
        .get()
        .then((response: any) => {
          simplifyGeoJsonHelper(response.data.data).then((dataMap) => {
            setMapState({
              load: false,
              dataMap: dataMap,
              error: null,
            });
            setLoad(false);
          });
        })
        .catch(() => {
          setMapState({
            load: false,
            dataMap: null,
            error: { message: "произошла ошибка при загрузки карты" },
          });
        });
    } else {
      setMapState({
        load: false,
        dataMap: JSON.parse(features),
        error: null,
      });
    }
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

  const [currentTab, setCurrentTab] = useState<string>(
    BookInfoTabs.BookInfo.toString()
  );

  const handleOnClickAddAudio = () => {
    setCurrentTab(BookInfoTabs.AddApplicationAudio.toString());
  };

  if (mapState.load || load) {
    return <LoadSpinner />;
  }

  if (mapState.error) {
    return <ErrorMessageScreen message={mapState.error.message} />;
  }

  return (
    <Dialog open={openDialog}>
      <div className="map-pag__content">
        {authFormState.open ? (
          <AuthForm onClose={() => handleOnCloseAuthForm()} />
        ) : null}
        <ToastContainer containerId="mapPageToast" />
        <div className="fixed flex items-center justify-between p-4 w-full">
          <Input
            className="min-h-11 max-w-fit bg-slate-50 self-center"
            type="text"
            placeholder="введите название этнической группы"
            value={ethnicGroupInputValue}
            onChange={handleInputChange}
          />

          <Button
            className="rounded-full bg-slate-50 self-center size-11"
            variant="ghost"
            size="icon"
            onClick={handleOnClickAvatar}
          >
            <span className="text-black">
              {authState.user
                ? authState.user.email.split("@")[0][0].toUpperCase()
                : "?"}
            </span>
          </Button>
        </div>

        {selectedAudioBook ? (
          <Drawer
            open={selectedAudioBook != undefined}
            modal={true}
            dismissible={false}
            handleOnly={true}
          >
            <DrawerContent className="flex items-center w-[50vw] left-[25lvw] right-[25lvw] px-4">
              <DrawerHeader className="pt-0">
                <DrawerTitle className="flex justify-between items-center text-center text-xl">
                  <span>{selectedAudioBook.name}</span>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setSelectedAudioBook(null)}
                  >
                    <Cross1Icon />
                  </Button>
                </DrawerTitle>
              </DrawerHeader>

              <AudioBookPlayer
                audios={selectedAudioBook.audios}
                onClose={() => setSelectedAudioBook(null)}
                onClickRate={handleOnClickRate}
                onClickAuth={() => {
                  setAuthFormState({ open: true, notifySuccess: false });
                }}
                hideHeader={true}
              />
            </DrawerContent>
          </Drawer>
        ) : null}

        {selectedBook.book ? (
          <DialogContent className="[&>button]:hidden m-0 p-0 animate-zoom-in dialog__content">
            <DialogTitle className="p-0 m-0 flex justify-end h-1">
              <Button
                onClick={handleOnCloseBook}
                size="icon"
                variant="ghost"
                className="p-0 m-1 size-6"
              >
                <Cross1Icon />
              </Button>
            </DialogTitle>
            <Tabs
              defaultValue={currentTab}
              value={currentTab}
              className="m-0 size-full"
            >
              <TabsContent value={BookInfoTabs.BookInfo.toString()}>
                {selectedBook ? (
                  <BookInfoCardComponent
                    load={selectedBook.load}
                    book={selectedBook.book}
                    audios={selectedBook.audios}
                    text={selectedBook.text}
                    onClickRate={handleOnClickRate}
                    onClickAuth={() => {
                      setAuthFormState({ open: true, notifySuccess: false });
                    }}
                    onClose={() => handleOnCloseBook()}
                    onClickAddAudio={handleOnClickAddAudio}
                  ></BookInfoCardComponent>
                ) : null}
              </TabsContent>
              <TabsContent value={BookInfoTabs.AddApplicationAudio.toString()}>
                <CreateApplicationAudioForm
                  storyId={selectedBook.book ? selectedBook.book.id : 0}
                  languages={languageListState.languages}
                  userId={authState.user ? Number(authState.user.sub) : 0}
                  onClose={() =>
                    setCurrentTab(BookInfoTabs.BookInfo.toString())
                  }
                />
              </TabsContent>
            </Tabs>
          </DialogContent>
        ) : null}

        {mapState.dataMap ? (
          <MapComponent
            features={mapState.dataMap.features}
            width={width}
            height={height}
            onClickAudioBook={handleOnClickAudioBook}
            onClickBook={handleOnClickBook}
          />
        ) : null}
      </div>
    </Dialog>
  );
};

export default MapPage;
