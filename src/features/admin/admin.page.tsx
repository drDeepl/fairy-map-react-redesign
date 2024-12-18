import React, { useEffect, useState } from "react";
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

const AdminPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>(MenuItemAdmin.Story);

  useEffect(() => {
    if (!authState.user) {
      navigate(-1);
    } else {
      dispatch(fetchEthnicGroups());
      dispatch(fetchListBooks());
      setLoading(false);
    }
  }, [authState.user]);

  if (loading) {
    return <LoadSpinner />;
  }

  const handleOnClickItemSidebar = (item: ItemSidebarAdmin) => {
    setCurrentTab(item.name);
  };

  return (
    <AdminSidebarLayout onClickItemSidebar={handleOnClickItemSidebar}>
      <Tabs defaultValue={MenuItemAdmin.Story} value={currentTab}>
        <TabsContent value={MenuItemAdmin.Story}>
          <AdminStoriesPage />
        </TabsContent>
        <TabsContent value={MenuItemAdmin.Request}>
          <AdminRequestsPage />
        </TabsContent>
      </Tabs>
    </AdminSidebarLayout>
  );
};

export default AdminPage;
