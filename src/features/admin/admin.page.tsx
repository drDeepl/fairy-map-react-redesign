import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/app/store";
import LoadSpinner from "@/components/ui/load-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchListBooks } from "../book/book.actions";
import { fetchEthnicGroups } from "../ethnic-group/ethnic-group-list.actions";
import AdminSidebarLayout from "./layouts/admin-sidebar.layout";
import { ItemSidebar } from "./interfaces/sidebar.interfaces";
import AdminStoriesPage from "./admin-stories.page";
import { MenuItem } from "./constants/sidebar-items";
import AdminRequestsPage from "./admin-requests.page";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { userLogOut } from "../auth/auth.slice";

const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>(MenuItem.Story);

  const handleOnClickExit = () => {
    dispatch(userLogOut());
    navigate(-1);
  };

  useEffect(() => {
    if (!authState.user) {
      navigate(-1);
    } else {
      setLoading(false);
      dispatch(fetchEthnicGroups());
      dispatch(fetchListBooks());
    }
  }, [authState]);

  if (loading) {
    return <LoadSpinner />;
  }

  const handleOnClickItemSidebar = (item: ItemSidebar) => {
    setCurrentTab(item.name);
  };

  return (
    <AdminSidebarLayout
      onClickItemSidebar={handleOnClickItemSidebar}
      onClickExit={handleOnClickExit}
    >
      <Tabs defaultValue={MenuItem.Story} value={currentTab}>
        <TabsContent value={MenuItem.Story}>
          <AdminStoriesPage />
        </TabsContent>
        <TabsContent value={MenuItem.Request}>
          <AdminRequestsPage />
        </TabsContent>
      </Tabs>
    </AdminSidebarLayout>
  );
};

export default AdminPage;
