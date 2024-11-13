import { AppDispatch, RootState } from "@/app/store";
import LoadSpinner from "@/components/ui/load-spinner";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!authState.user) {
      navigate(-1);
    } else {
      setLoading(false);
    }
  }, [authState.user]);

  if (loading) {
    return <LoadSpinner />;
  }

  return <div>Admin Page in progress</div>;
};

export default AdminPage;
