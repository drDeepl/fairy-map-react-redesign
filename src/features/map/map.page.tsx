import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./map.component";
import { fetchMapData } from "./map.actions";

import { AuthState, setVerifyedCaptcha } from "../auth/auth.slice";
import AuthForm from "../auth/auth.form.component";
import ErrorMessageScreen from "@/pages/error-message.page";
import { useNavigate } from "react-router-dom";
import { getRoutePageByUserRole } from "@/common/helpers/page.helper";
import { setFeatures } from "./map.slice";
import { Components } from "@/api/schemas/client";

import { addRatingAudio } from "../audio-book/audio-book.actions";

import BookInfoCardComponent from "../book/components/book-info-card.component";

import CreateApplicationAudioForm from "../application/forms/schemas/create-application-audio.form";

import { LanguageListState } from "../language/language-list.slice";
import { fetchLanguages } from "../language/language.actions";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BookInfoTabs } from "./constants/book-info-tabs.enum";
import { ToastContainer } from "react-toastify";

interface MapPageProps {
  width: number;
  height: number;
}

interface AuthFormState {
  open: boolean;
  notifySuccess: boolean;
}

const MapPage: React.FC<MapPageProps> = ({ width, height }) => {
  const mapState = useSelector((state: RootState) => state.map);
  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const languageListState: LanguageListState = useSelector(
    (state: RootState) => state.languageList
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLanguages());
  }, []);

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
    setAuthFormState((prevState) => ({ ...prevState, open: false }));
    dispatch(setVerifyedCaptcha(false));
  };

  const handleOnClickAvatar = () => {
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

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOnClickAudioBook = (
    audio: Components.Schemas.PreviewAudioStoryResponseDto
  ) => {
    setSelectedAudioBook(audio);
    console.log(selectedAudioBook);
  };

  // const handleOnCloseAudioBook = async () => {
  //   setOpenDialog(false);
  //   setSelectedAudioBook(null);
  // };

  const handleOnClickRate = async (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ): Promise<Components.Schemas.AddedRatingAudioStoryDto | undefined> => {
    return await dispatch(addRatingAudio(dto)).unwrap();
  };

  const handleOnSubmitAuth = async () => {
    navigate(getRoutePageByUserRole(authState.user!.role));
  };

  const [
    selectedBook,
    setSelectedBook,
  ] = useState<Components.Schemas.StoryWithImgResponseDto | null>(null);

  const handleOnClickBook = async (
    book: Components.Schemas.StoryWithImgResponseDto
  ) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleOnCloseBook = async () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    const features: string | null = localStorage.getItem("features");
    if (!features) {
      dispatch(fetchMapData());
    } else {
      dispatch(setFeatures(JSON.parse(features)));
    }
    // setLoad(false);
  }, [dispatch]);

  const [currentTab, setCurrentTab] = useState<string>(
    BookInfoTabs.BookInfo.toString()
  );

  const handleOnClickAddAudio = () => {
    setCurrentTab(BookInfoTabs.AddApplicationAudio.toString());
  };

  if (mapState.loading || load) {
    return <LoadSpinner />;
  }

  if (mapState.error) {
    return <ErrorMessageScreen message={mapState.error.message} />;
  }

  return (
    <Dialog open={openDialog}>
      <div className="map-pag__content">
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
            onClick={() => handleOnClickAvatar()}
          >
            <span className="text-black">
              {authState.user
                ? authState.user.email.split("@")[0][0].toUpperCase()
                : "?"}
            </span>
          </Button>

          <AuthForm
            visible={authFormState.open}
            onSubmit={handleOnSubmitAuth}
            onClose={() => handleOnCloseAuthForm()}
          />
        </div>

        {mapState.dataMap ? (
          <MapComponent
            features={mapState.dataMap.features}
            width={width}
            height={height}
            onClickAudioBook={handleOnClickAudioBook}
            onClickBook={handleOnClickBook}
          />
        ) : null}

        <DialogContent className="[&>button]:hidden m-0 p-0 animate-zoom-in dialog__content">
          <Tabs
            defaultValue={currentTab}
            value={currentTab}
            className="m-0 size-full"
          >
            <TabsContent value={BookInfoTabs.BookInfo.toString()}>
              {selectedBook ? (
                <BookInfoCardComponent
                  book={selectedBook}
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
                storyId={selectedBook ? selectedBook.id : 0}
                languages={languageListState.languages}
                userId={authState.user ? Number(authState.user.sub) : 0}
                onClose={() => setCurrentTab(BookInfoTabs.BookInfo.toString())}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default MapPage;
