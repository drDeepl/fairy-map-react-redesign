import React from "react";
import { QuestionMarkIcon } from "@radix-ui/react-icons";

const NotCoverBook: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-slate-200 size-full">
      <QuestionMarkIcon className="size-14 text-zinc-600 opacity-60" />
      {/* <img
        src="https://chuvashskie-skazki.larec-skazok.ru/upload/country/bg/0a5/e0/01/32373a7031000fd987a3c9f87b.jpg"
        className="object-cover"
      /> */}
    </div>
  );
};

export default NotCoverBook;
