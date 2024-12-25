import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { RouteApp } from "./constants/route.enum";
import { motion } from "framer-motion";

const WelcomePage: React.FC = () => {
  const title = 'Проект "Сохранение культурного наследия России"';

  const description =
    "Проект представляет собой интерактивный веб-сайт, на котором размещена карта России. Пользователь может выбрать регион, а затем этническую группу и язык, чтобы прослушать сказку, соответствующую этой группе";
  const navigate = useNavigate();
  const handleOnMap = () => {
    navigate(RouteApp.MapPage);
  };

  return (
    <div className="bg-[url('welcome-page-bg.png')] bg-center bg-scroll">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="min-h-screen flex flex-col items-center justify-center backdrop-blur-sm bg-gradient-to-t from-orange-50">
          <div className="flex flex-col items-center">
            <h1 className="text-slate-700 text-3xl font-bold mb-3">{title}</h1>
            <p className="text-slate-600 text-center text-balance">
              {description}
            </p>
          </div>
          <div className="flex flex-around space-x-2">
            <Button
              className="mt-4 bg-orange-600  hover:bg-slate-100 hover:text-slate-700 animate-jump-heart"
              onClick={handleOnMap}
            >
              карта
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomePage;
