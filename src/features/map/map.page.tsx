import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./map.component";
import { fetchMapData } from "./mapSlice";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { AuthState, setVerifyedCaptcha } from "../auth/authSlice";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import AuthForm from "../auth/auth.form.component";

const MapPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { dataMap, loading, error } = useSelector(
    (state: RootState) => state.map
  );

  const authState: AuthState = useSelector((state: RootState) => state.auth);

  const [ethnicGroupInputValue, setEthnicGroupInputValue] = useState<string>(
    ""
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEthnicGroupInputValue(event.target.value);
    console.log(event.target.value); // Логирование значения в консоль
  };

  const [authFormVisible, setAuthFormVisible] = useState<boolean>(false);

  const handleClickAvatar = () => {};

  const handleCloseAuthForm = () => {
    setAuthFormVisible(false);
    dispatch(setVerifyedCaptcha(false));
  };

  useEffect(() => {
    dispatch(fetchMapData());
  }, [dispatch]);

  if (loading) {
    return <LoadSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
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
            onClick={() => setAuthFormVisible(true)}
          >
            <span className="text-black">
              {authState.user ? authState.user.email.split("@") : "?"}
            </span>
          </Button>
        </Avatar>

        <AuthForm
          visible={authFormVisible}
          onClose={() => handleCloseAuthForm()}
        />
      </div>
      {dataMap ? <MapComponent features={dataMap} /> : ""}
    </div>

    // </div>
    // {/* </ResizablePanel> */}
    // <ResizablePanelGroup
    //   direction="vertical"
    //   className="min-h-screen min-w-screen"
    // >
    /* <ResizablePanel defaultSize={10}>
        <div className="flex h-3 items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel> */

    // </ResizablePanelGroup>
    // <div className="map-page__container flex justify-content-center">
    //   <Topbar
    //     user={authState.user}
    //     onClickSignIn={handleClickSignIn}
    //     onClickLogIn={handleClickLogIn}
    //   />

    // </div>
  );
};

export default MapPage;
