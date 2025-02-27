import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";
import { RouteApp } from "./constants/route.enum";
import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";
import { QuoteIcon } from "@radix-ui/react-icons";

const WelcomePage: React.FC = () => {
  const title = "Сохранение культурного наследия России";

  const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
  const variants = {
    hidden: { filter: "blur(10px)", transform: "translateY(20%)", opacity: 0 },
    visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
  };

  const description =
    "Приложение представляет собой интерактивный веб-сайт, на котором размещена карта России. Пользователь может выбрать регион, а затем этническую группу и язык, чтобы прослушать сказку, соответствующую выбранной группе";
  const navigate = useNavigate();
  const handleOnMap = () => {
    navigate(RouteApp.MapPage);
  };

  const words = title.split(" ");

  return (
    <motion.div
      className={`bg-[url(/welcome-page-bg.png)] bg-cover bg-center bg-scroll`}
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.04 }}
    >
      <motion.div className="min-h-screen flex flex-col items-center justify-center backdrop-blur-sm bg-gradient-to-t from-orange-50">
        <motion.div
          className="flex flex-col items-center px-2 w-5/6 lg:w-4/6 rounded-xl backdrop-blur-sm bg-gradient-to-t text-center font-semibold shadow-md"
          transition={transition}
          variants={variants}
        >
          <motion.span
            className="inline-block place-self-start pb-6 text-slate-600"
            transition={transition}
            variants={variants}
          >
            <QuoteIcon className="size-14" />
          </motion.span>
          <h1 className="flex flex-col text-slate-600 text-3xl font-bold mb-4 sm:flex-row px-4">
            {words.map((word, index) => (
              <React.Fragment key={index}>
                <motion.span
                  className="inline-block px-1 italic"
                  transition={transition}
                  variants={variants}
                >
                  {word}
                </motion.span>
                {index < words.length - 1 && " "}
              </React.Fragment>
            ))}
          </h1>
          <motion.div transition={transition} variants={variants} className="">
            <motion.p
              className="text-slate-600 text-lg mb-4 p-2 "
              transition={transition}
              variants={variants}
            >
              {description}
            </motion.p>
          </motion.div>
          <div className="flex flex-around space-x-2">
            <motion.div transition={transition} variants={variants}>
              <Button
                className="flex flex-col mt-2 bg-orange-600 hover:bg-slate-100 hover:text-orange-600 hover:border border-orange-600 animate-jump-heart"
                onClick={handleOnMap}
              >
                <div className="flex items-center space-x-2">
                  <span>к карте</span>
                  <MapPinned className="" />
                </div>
              </Button>
            </motion.div>
          </div>
          <motion.span
            className="inline-block place-self-end pb-0 mb-0 text-slate-600"
            transition={transition}
            variants={variants}
          >
            <QuoteIcon className="size-14 scale-x-[-1]" />
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage;
