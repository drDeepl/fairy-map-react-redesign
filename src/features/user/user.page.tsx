import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "@/app/store";
import { useSelector, useDispatch } from "react-redux";
import { AuthState } from "../auth/auth.slice";
import { useNavigate } from "react-router-dom";
import LoadSpinner from "@/components/ui/load-spinner";
import { Button } from "@/components/ui/button";

const UserPage: React.FC = () => {
  const { user }: AuthState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [load, setLoad] = useState<boolean>(true);

  useEffect(() => {
    if (!user) {
      navigate(-1);
    } else {
      setLoad(false);
    }
  }, [user]);

  const handleOnClickAvatar = () => {
    console.error("on click avatar");
  };

  if (load) {
    return <LoadSpinner />;
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="w-full flex justify-end px-4 py-2">
        <Button
          className="rounded-full border border-slate-800 bg-slate-100 size-11 shadow-md"
          variant="ghost"
          size="icon"
          onClick={() => handleOnClickAvatar()}
        >
          <span className="text-black">{user?.firstName[0].toUpperCase()}</span>
        </Button>
      </div>
    </div>
  );
};

export default UserPage;
