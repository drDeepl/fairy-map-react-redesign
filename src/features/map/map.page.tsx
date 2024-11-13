import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./map.component";
import { fetchMapData } from "./map.actions";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { AuthState, setVerifyedCaptcha } from "../auth/authSlice";

import AuthForm from "../auth/auth.form.component";
import ErrorMessageScreen from "@/pages/error-message.page";
import { useNavigate } from "react-router-dom";

import { getRoutePageByUserRole } from "@/common/helpers/page.helper";

const MapPage: React.FC = () => {
  const mapState = useSelector((state: RootState) => state.map);
  const authState: AuthState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [ethnicGroupInputValue, setEthnicGroupInputValue] = useState<string>(
    ""
  );

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
      console.log("user exists");
      const routeUserPersonalPage: string = getRoutePageByUserRole(
        authState.user.role
      );
      console.log("navigate");
      navigate(routeUserPersonalPage);
    } else {
      setAuthFormVisible(true);
    }
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
      <div className="fixed flex items-center justify-between p-4 w-full">
        <Input
          className="min-h-11 max-w-fit bg-slate-50"
          type="text"
          placeholder="введите название этнической группы"
          value={ethnicGroupInputValue}
          onChange={handleInputChange}
        />

        <Avatar className="">
          <Button
            className="h-11 w-11 rounded-full bg-slate-50"
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
        </Avatar>

        <AuthForm
          visible={authFormVisible}
          onClose={() => handleCloseAuthForm()}
        />
      </div>
      {mapState.dataMap ? <MapComponent features={mapState.dataMap} /> : ""}
    </div>
  );
};

export default MapPage;
