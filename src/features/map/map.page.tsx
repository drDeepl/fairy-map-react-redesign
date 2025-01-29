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
import { ToastContainer } from "react-toastify";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AudioBookPlayer from "../audio-book/audio-book-player.component";

import apiClient from "@/api/apiClient";
import { simplifyGeoJsonHelper } from "./helpers/simplify-geo-json.helper";
import { FeatureProperties } from "./map.interface";
import { FeatureCollection, Geometry } from "geojson";
import NotCoverBook from "@/components/not-cover-book.component";
import SearchBookBox from "../book/components/search-book-box.component";
import { useMediaQuery } from "react-responsive";

import DialogSheet from "@/components/dialog-sheet";

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

  const [
    selectedAudioBook,
    setSelectedAudioBook,
  ] = useState<Components.Schemas.PreviewAudioStoryResponseDto | null>(null);

  const [dialog, setOpenDialog] = useState<boolean>(false);

  const handleOnClickAudioBook = (
    audio: Components.Schemas.PreviewAudioStoryResponseDto
  ) => {
    setOpenDialog(true);
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
    audios: [],
  });

  const handleOnClickBook = async (
    book: Components.Schemas.StoryBookWithAudiosResponseDto
  ) => {
    console.log(book);
    setSelectedBook((prevState) => ({ ...prevState, book: book, load: false }));
    setOpenDialog(true);
    setCurrentTab(MapModalTabs.BookInfo.toString());
    // try {
    // const res = await apiClient.paths["/api/story/{storyId}/audio/all"].get({
    //   storyId: book.id,
    // });
    //   setSelectedBook((prevState) => ({
    //     ...prevState,
    //     audios: res.data,
    //     load: false,
    //   }));
    // } catch (error) {
    //   console.log(error);
    //   setSelectedBook((prevState) => ({
    //     ...prevState,
    //     load: false,
    //   }));
    // }
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

  const [currentTab, setCurrentTab] = useState<string>(
    MapModalTabs.BookInfo.toString()
  );

  const handleOnClickAddAudio = () => {
    setCurrentTab(MapModalTabs.AddApplicationAudio.toString());
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
          <div className="w-44">
            <AuthForm onClose={handleOnCloseAuthForm} />
          </div>
        </DialogSheet>
      )}
      {selectedBook.book && (
        <DialogSheet onClose={handleOnCloseBook}>
          <Tabs
            defaultValue={currentTab}
            value={currentTab}
            className="p-1 size-full"
          >
            <TabsContent value={MapModalTabs.BookInfo.toString()}>
              <BookInfoCardComponent
                load={selectedBook.load}
                book={selectedBook.book}
                audios={selectedBook.book.audios}
                onClickRate={handleOnClickRate}
                onClickAuth={() => {
                  setAuthFormState({ open: true, notifySuccess: false });
                }}
                onClickAddAudio={handleOnClickAddAudio}
              ></BookInfoCardComponent>
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
      <div className="absolute z-[10] w-full flex justify-between p-4 ">
        {/* <SearchBookBox onClickBook={handleOnClickBook} /> */}
        <Button
          className="rounded-full bg-slate-50 self-center size-12"
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
      {mapState.dataMap && (
        <MapComponent
          features={mapState.dataMap.features}
          width={width}
          height={height}
          onClickAudioBook={handleOnClickAudioBook}
          onClickBook={handleOnClickBook}
        />
      )}
    </div>
  );

  //   return (
  //     <Dialog open={dialog}>
  //       {authFormState.open ? <AuthForm onClose={handleOnCloseAuthForm} /> : null}
  //       {selectedBook.book ? (
  //         <DialogContent className="[&>button]:hidden m-0 p-0 animate-zoom-in dialog__content h-full w-full sm:h-72">
  //           <DialogTitle className="p-0 m-0 flex justify-end h-1">
  //             <Button
  //               onClick={handleOnCloseBook}
  //               size="icon"
  //               variant="ghost"
  //               className="p-0 m-1 "
  //             >
  //               <Cross1Icon />
  //             </Button>
  //           </DialogTitle>
  //           <Tabs
  //             defaultValue={currentTab}
  //             value={currentTab}
  //             className="m-0 size-full"
  //           >
  //             <TabsContent value={MapModalTabs.BookInfo.toString()}>
  //               <BookInfoCardComponent
  //                 load={selectedBook.load}
  //                 book={selectedBook.book}
  //                 audios={selectedBook.audios}
  //                 onClickRate={handleOnClickRate}
  //                 onClickAuth={() => {
  //                   setAuthFormState({ open: true, notifySuccess: false });
  //                 }}
  //                 onClickAddAudio={handleOnClickAddAudio}
  //               ></BookInfoCardComponent>
  //             </TabsContent>
  //             <TabsContent value={MapModalTabs.AddApplicationAudio.toString()}>
  //               <CreateApplicationAudioForm
  //                 storyId={selectedBook.book ? selectedBook.book.id : 0}
  //                 languages={languageListState.languages}
  //                 userId={authState.user ? Number(authState.user.sub) : 0}
  //                 onClose={() => setCurrentTab(MapModalTabs.BookInfo.toString())}
  //               />
  //             </TabsContent>
  //           </Tabs>
  //         </DialogContent>
  //       ) : null}
  //       <div className="map-pag__content">
  //         <ToastContainer containerId="mapPageToast" />
  //         <div className="overflow-hidden fixed flex items-center justify-between p-4 w-full text-slate-600">
  //           <SearchBookBox onClickBook={handleOnClickBook} />
  //           <Button
  //             className="rounded-full bg-slate-50 self-center size-12"
  //             variant="ghost"
  //             size="icon"
  //             onClick={handleOnClickAvatar}
  //           >
  //             <span className="text-black">
  //               {authState.user
  //                 ? authState.user.email.split("@")[0][0].toUpperCase()
  //                 : "?"}
  //             </span>
  //           </Button>
  //         </div>

  //         {selectedAudioBook ? (
  //           <Sheet open={selectedAudioBook != undefined} modal={true}>
  //             <SheetContent
  //               className="[&>button]:hidden flex flex-col w-[55vw] py-1 px-4 place-self-center rounded-t-md"
  //               side="bottom"
  //             >
  //               <SheetHeader className="w-full m-0 p-0">
  //                 <SheetTitle className="flex justify-between items-center m-0 p-0 text-xl">
  //                   <span>{selectedAudioBook.name}</span>
  //                   <Button
  //                     className="p-0 m-0"
  //                     variant="secondary"
  //                     size="icon"
  //                     onClick={() => setSelectedAudioBook(null)}
  //                   >
  //                     <Cross1Icon />
  //                   </Button>
  //                 </SheetTitle>
  //               </SheetHeader>
  //               <div className="grid grid-cols-2 gap-3">
  //                 {selectedAudioBook.srcImg ? (
  //                   <img
  //                     src={selectedAudioBook.srcImg}
  //                     alt={selectedAudioBook.name}
  //                     className="rounded-t-xl w-44 h-60 object-cover"
  //                   />
  //                 ) : (
  //                   <NotCoverBook />
  //                 )}

  //                 <AudioBookPlayer
  //                   audios={selectedAudioBook.audios}
  //                   onClickRate={handleOnClickRate}
  //                   onError={(msg) => console.error(msg)}
  //                 />
  //               </div>
  //             </SheetContent>
  //           </Sheet>
  //         ) : null}

  //         {mapState.dataMap ? (
  //           <MapComponent
  //             features={mapState.dataMap.features}
  //             width={width}
  //             height={height}
  //             onClickAudioBook={handleOnClickAudioBook}
  //             onClickBook={handleOnClickBook}
  //           />
  //         ) : null}
  //       </div>
  //     </Dialog>
  //   );
};

export default MapPage;
