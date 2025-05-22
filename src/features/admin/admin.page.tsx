import React, { useEffect, useRef, useState } from "react";
import { AppDispatch, RootState } from "@/app/store";
import LoadSpinner from "@/components/ui/load-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchListBooks } from "../book/book.actions";
import { fetchEthnicGroups } from "../ethnic-group/ethnic-group-list.actions";
import AdminSidebarLayout from "./layouts/admin-sidebar.layout";
import { ItemSidebarAdmin } from "./interfaces/item-sidebar.interfaces";
import AdminStoriesPage from "./admin-stories.page";
import { MenuItemAdmin } from "./constants/sidebar-items";
import AdminRequestsPage from "./admin-requests.page";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { userLogOut } from "../auth/auth.slice";
import { RouteApp } from "@/pages/constants/route.enum";
import StickyBottomReveal from "@/components/ui/sticky-bottom-reveal";
import BookPlayer from "../book-player/book-player";

const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const prevTab: string | null = localStorage.getItem("currentTab");

  const [bottomPanelOpen, setBottomPanelOpen] = useState(false);

  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>(
    prevTab ? prevTab : MenuItemAdmin.Story
  );

  const handleOnClickExit = () => {
    navigate(RouteApp.MapPage);
    dispatch(userLogOut());
    localStorage.removeItem("currentTab");
  };

  useEffect(() => {
    if (!authState.user) {
      navigate(-1);
    } else {
      setLoading(false);
      dispatch(fetchEthnicGroups());
      dispatch(fetchListBooks({ page: 1, take: 10 }));
    }
  }, [authState]);

  if (loading) {
    return <LoadSpinner />;
  }

  const handleOnClickItemSidebar = async (item: ItemSidebarAdmin) => {
    setCurrentTab(item.name);
    localStorage.setItem("currentTab", item.name);
  };

  return (
    <AdminSidebarLayout
      onClickItemSidebar={handleOnClickItemSidebar}
      onClickExit={handleOnClickExit}
    >
      <Tabs defaultValue={MenuItemAdmin.Story} value={currentTab}>
        <TabsContent value={MenuItemAdmin.Story}>
          <AdminStoriesPage />
        </TabsContent>
        <TabsContent value={MenuItemAdmin.Request}>
          <AdminRequestsPage setBottomPanelOpen={setBottomPanelOpen} />
        </TabsContent>
      </Tabs>

      <StickyBottomReveal
        isPanelOpen={bottomPanelOpen}
        setIsPanelOpen={setBottomPanelOpen}
      >
        <BookPlayer />
      </StickyBottomReveal>
    </AdminSidebarLayout>
  );
};

export default AdminPage;
