import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./map.component";
import { fetchMapData } from "./mapSlice";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AuthState } from "../auth/authSlice";

const MapPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { dataMap, loading, error } = useSelector(
    (state: RootState) => state.map
  );

  const handleClickSignIn = () => {
    console.log("click sign in");
  };

  const handleClickLogIn = () => {
    console.log("click log in");
  };

  const authState: AuthState = useSelector((state: RootState) => state.auth);

  const [ethnicGroupInputValue, setEthnicGroupInputValue] =
    useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEthnicGroupInputValue(event.target.value);
    console.log(event.target.value); // Логирование значения в консоль
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
    // <ResizablePanel>

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
          >
            <span className="text-black">
              {authState.user ? authState.user.email.split("@") : "?"}
            </span>
          </Button>
        </Avatar>
      </div>
      {dataMap ? <MapComponent features={dataMap} /> : ""}{" "}
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
