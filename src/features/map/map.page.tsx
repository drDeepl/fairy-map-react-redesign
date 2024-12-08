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
import { fetchAudiosByBookId } from "../book/book.actions";
import { setBook } from "../book/book.slice";
import BookInfoCardComponent from "../book/components/book-info-card.component";
import { Components, StoryWithImgResponseDto } from "../../api/schemas/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const MapPage: React.FC = () => {
  const width: number = document.documentElement.clientWidth;
  const height: number = document.documentElement.clientHeight;

  const mapState = useSelector((state: RootState) => state.map);
  const authState: AuthState = useSelector((state: RootState) => state.auth);
  const bookState = useSelector((state: RootState) => state.book);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [ethnicGroupInputValue, setEthnicGroupInputValue] =
    useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEthnicGroupInputValue(event.target.value);
    console.log(event.target.value); // Логирование значения в консоль
  };

  const [authFormVisible, setAuthFormVisible] = useState<boolean>(false);

  const handleCloseAuthForm = () => {
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

  const handleClickBook = async (
    book: Components.Schemas.StoryWithImgResponseDto
  ) => {
    await dispatch(fetchAudiosByBookId(book.id));
    dispatch(setBook(book));
  };

  useEffect(() => {
    dispatch(fetchMapData());
  }, [dispatch]);

  if (mapState.loading) {
    return <LoadSpinner />;
  }

  if (mapState.error) {
    return <ErrorMessageScreen message={mapState.error.message} />;
  }

  return (
    <div className="map-pag__content">
      {/* <Toaster /> */}

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
          onClose={() => handleCloseAuthForm()}
        />
      </div>

      {mapState.dataMap ? (
        <MapComponent
          features={mapState.dataMap.features}
          width={width}
          height={height}
          onClickBook={handleClickBook}
        />
      ) : (
        ""
      )}
      {bookState.selectedBook ? (
        <BookInfoCardComponent
          load={bookState.loading}
          book={bookState.selectedBook}
          audios={bookState.audios}
          open={bookState.selectedBook ? true : false}
          onClose={() => dispatch(setBook(null))}
        />
      ) : null}
    </div>
  );
};

export default MapPage;
