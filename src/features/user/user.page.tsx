import React, { useEffect } from "react";
import { RootState, AppDispatch } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { AuthState } from "../auth/auth.slice";
import { useNavigate } from "react-router-dom";

const UserPage: React.FC = () => {
  const { user }: AuthState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(-1);
    }
  }, [user]);

  return <div className="flex flex-col justify-center"></div>;
};

export default UserPage;
