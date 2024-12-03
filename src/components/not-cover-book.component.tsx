import React from "react";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

const NotCoverBook: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-slate-200 size-full rounded-t-xl">
      <QuestionMarkIcon className="size-14 text-zinc-600 opacity-60" />
    </div>
  );
};

export default NotCoverBook;
