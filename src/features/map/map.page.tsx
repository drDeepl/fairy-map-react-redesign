import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./map.component";
import { fetchMapData } from "./map.actions";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthState, setVerifyedCaptcha } from "../auth/auth.slice";
import AuthForm from "../auth/auth.form.component";
import ErrorMessageScreen from "@/pages/error-message.page";
import { useNavigate } from "react-router-dom";
import { getRoutePageByUserRole } from "@/common/helpers/page.helper";
import { setFeatures } from "./map.slice";
import { Components } from "@/api/schemas/client";
import AudioBookPlayer from "../audio-book/audio-book-player.component";
import { addRatingAudio } from "../audio-book/audio-book.actions";

import { Report } from "notiflix/build/notiflix-report-aio";

interface MapPageProps {
  width: number;
  height: number;
}

const MapPage: React.FC<MapPageProps> = ({ width, height }) => {
  const mapState = useSelector((state: RootState) => state.map);
  const authState: AuthState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [load, setLoad] = useState<boolean>(true);

  const [ethnicGroupInputValue, setEthnicGroupInputValue] = useState<string>(
    ""
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEthnicGroupInputValue(event.target.value);
    console.log(event.target.value); // Логирование значения в консоль
  };

  const [authFormVisible, setAuthFormVisible] = useState<boolean>(false);

  const handleOnCloseAuthForm = async () => {
    setAuthFormVisible(false);
    dispatch(setVerifyedCaptcha(false));
  };

  const handleOnClickAvatar = () => {
    if (authState.user) {
      const routeUserPersonalPage: string = getRoutePageByUserRole(
        authState.user.role
      );

      navigate(routeUserPersonalPage);
    } else {
      setAuthFormVisible(true);
    }
  };

  const [
    selectedAudioBook,
    setSelectedAudioBook,
  ] = useState<Components.Schemas.PreviewAudioStoryResponseDto | null>(null);

  const handleOnClickAudioBook = (
    audio: Components.Schemas.PreviewAudioStoryResponseDto
  ) => {
    setSelectedAudioBook(audio);
  };

  const handleOnCloseAudioBook = () => {
    setSelectedAudioBook(null);
  };

  const handleOnClickRate = async (
    dto: Components.Schemas.AddRatingAudioStoryDto
  ): Promise<Components.Schemas.AddedRatingAudioStoryDto | undefined> => {
    return await dispatch(addRatingAudio(dto)).unwrap();
  };

  const handleOnSubmitAuth = async (msg: string) => {
    handleOnCloseAuthForm().then((result) => {
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
    });
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

  if (mapState.loading || load) {
    return <LoadSpinner />;
  }

  if (mapState.error) {
    return <ErrorMessageScreen message={mapState.error.message} />;
  }

  return (
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
          visible={authFormVisible}
          onSubmit={handleOnSubmitAuth}
          onClose={() => handleOnCloseAuthForm()}
        />
      </div>
      {/* <SuccessMessageAlert
        title=""
        open={authState.success}
        onSubmit={() => {
          handleOnCloseAuthForm();
          navigate(getRoutePageByUserRole(authState.user!.role));
        }}
        onCancel={() => {
          handleOnCloseAuthForm();
        }}
        buttonsName={{
          onSubmit: "в личный кабинет",
          onCancel: "остаться на странице",
        }}
      /> */}

      {mapState.dataMap ? (
        <MapComponent
          features={mapState.dataMap.features}
          width={width}
          height={height}
          onClickAudioBook={handleOnClickAudioBook}
        />
      ) : (
        ""
      )}
      {selectedAudioBook ? (
        <AudioBookPlayer
          title={selectedAudioBook.name}
          audios={selectedAudioBook.audios}
          onClickRate={handleOnClickRate}
          onClose={handleOnCloseAudioBook}
          onClickAuth={handleOnClickAvatar}
        />
      ) : null}
    </div>
  );
};

export default MapPage;
