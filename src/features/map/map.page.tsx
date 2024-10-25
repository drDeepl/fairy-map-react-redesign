import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./map.component";
import { fetchMapData } from "./mapSlice";
import { ResizablePanelGroup, ResizablePanel } from "@/components/ui/resizable";
import LoadSpinner from "@/components/ui/load-spinner";

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
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-screen min-w-screen"
    >
      {/* <ResizablePanel defaultSize={10}>
        <div className="flex h-3 items-center justify-center p-6">
          <span className="font-semibold">Header</span>
        </div>
      </ResizablePanel> */}
      <ResizablePanel>
        <div className="flex h-full items-center justify-center p-6">
          <div className="map-pag__content">
            {dataMap ? <MapComponent features={dataMap} /> : ""}{" "}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
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
