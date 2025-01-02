import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useRef, useState } from "react";
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

import { Report } from "notiflix/build/notiflix-report-aio";

import BookInfoCardComponent from "../book/components/book-info-card.component";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import apiClient from "@/api/apiClient";

import { AxiosResponse, OperationResponse } from "openapi-client-axios";
import { Notify } from "notiflix";
import CreateApplicationAudioForm from "../audio-book/forms/create-application-audio.form";
import { CreateApplicationAudioDataForm } from "../audio-book/interfaces/application-audio.interfaces";
import { LanguageListState } from "../language/language-list.slice";
import { fetchLanguages } from "../language/language.actions";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookInfoTabs } from "./constants/book-info-tabs.enum";

interface MapPageProps {
  width: number;
  height: number;
}

interface AuthFormState {
  open: boolean;
  notifySuccess: boolean;
}

interface ApplicationAudioFormState {
  open: boolean;
  useTermsApply: boolean;
  storyId: number | null;
  languageId: number | null;
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

  const [ethnicGroupInputValue, setEthnicGroupInputValue] =
    useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEthnicGroupInputValue(event.target.value);
    console.log(event.target.value); // Логирование значения в консоль
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

  const [selectedAudioBook, setSelectedAudioBook] =
    useState<Components.Schemas.PreviewAudioStoryResponseDto | null>(null);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [applicationAudioFormState, setApplicationAudioFormState] =
    useState<ApplicationAudioFormState>({
      open: false,
      useTermsApply: false,
      storyId: null,
      languageId: null,
    });

  const handleOnClickAudioBook = (
    audio: Components.Schemas.PreviewAudioStoryResponseDto
  ) => {
    setSelectedAudioBook(audio);
  };

  const handleOnCloseAudioBook = async () => {
    setOpenDialog(false);
    setSelectedAudioBook(null);
  };

  // const onSubmit
  const onSubmitApplicationAudioFormState = async (
    data: CreateApplicationAudioDataForm
  ) => {
    console.warn(data);
  };

  const handleOnClickRate = async (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ): Promise<Components.Schemas.AddedRatingAudioStoryDto | undefined> => {
    return await dispatch(addRatingAudio(dto)).unwrap();
  };

  const handleOnSubmitAuth = async (msg: string) => {
    await handleOnCloseAuthForm();
    if (authFormState.notifySuccess) {
      Report.success(
        msg,
        "* чтобы остаться на странице щелкните по зеленому фону",
        "личный кабинет",
        () => (
          <Button
            onClick={() =>
              navigate(getRoutePageByUserRole(authState.user!.role))
            }
          ></Button>
        ),
        {
          backOverlayClickToClose: true,
          borderRadius: "0.5rem",

          success: {
            titleColor: "#334155",
            messageColor: "#94a3b8",
          },
        }
      );
    }
  };

  const [selectedBook, setSelectedBook] =
    useState<Components.Schemas.StoryWithImgResponseDto | null>(null);

  const handleOnClickBook = async (
    book: Components.Schemas.StoryWithImgResponseDto
  ) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleOnCloseBook = async () => {
    console.log("handleOnCloseBook");
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
    setLoad(false);
  }, [dispatch]);

  const [currentTab, setCurrentTab] = useState<string>(
    BookInfoTabs.BookInfo.toString()
  );

  const handleOnClickAddAudio = () => {
    setCurrentTab(BookInfoTabs.AddApplicationAudio.toString());
    console.log("on click add audio");
    setApplicationAudioFormState((prevState) => ({ ...prevState, open: true }));
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

        {/* <DialogContent className="p-0 m-0 [&>button]:hidden"> */}
        {/* {selectedAudioBook ? (
            <AudioBookPlayer
              audioBook={selectedAudioBook}
              onClickRate={handleOnClickRate}
              onClose={handleOnCloseAudioBook}
              onClickAuth={handleOnClickAvatar}
              hideHeader={false}
            />
          ) : null} */}
        <DialogContent className="[&>button]:hidden m-0 p-0 animate-zoom-in">
          {/* <DialogTitle className="m-0 p-0"></DialogTitle> */}
          {/* <DialogDescription className="m-0 p-0"></DialogDescription> */}
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
