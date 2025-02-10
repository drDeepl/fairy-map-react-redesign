import React, { useState } from "react";

import { StarFilledIcon } from "@radix-ui/react-icons";
import { Components } from "@/api/schemas/client";
import AudioBookPlaylist from "@/features/book/components/audio-book-playlist.component";
import TooltipStarRating from "@/components/tooltip-star-rating-motion";

import TapableButton from "@/components/tapable-button.component";
import AudioPlayer from "@/components/audio-player.component";
import {
  Accordion,
  AccordionTrigger,
} from "@/components/accordition-block.component";
import { AccordionContent } from "@/components/accordition-block.component";
import { motion } from "framer-motion";
import { LanguagesIcon } from "lucide-react";

interface AudioPlayerProps {
  audioBooks: Components.Schemas.AudioStoryResponseDto[];
  onError: (msg: string) => void;
  onClickRate?: (
    rating: number,
    audio: Components.Schemas.AudioStoryResponseDto
  ) => Promise<number>;
  compactMode?: boolean;
  children?: React.ReactNode;
}

const AudioBook: React.FC<AudioPlayerProps> = ({
  audioBooks,
  onClickRate,
  onError,
  compactMode = true,
  children,
}) => {
  const [selectedAudio, setSelectedAudio] = useState<
    Components.Schemas.AudioStoryResponseDto
  >(audioBooks[0]);

  const handleOnClickStar = async (rating: number) => {
    if (onClickRate) {
      const newRating = await onClickRate(rating, selectedAudio);

      setSelectedAudio((prevState) => ({
        ...prevState,
        commonRating: newRating,
      }));

      return newRating;
    } else {
      return selectedAudio.commonRating;
    }
  };

  const handleOnClickAudioBook = (
    audio: Components.Schemas.AudioStoryResponseDto
  ) => {
    setSelectedAudio(audio);
  };

  const handleOnChangeOpen = (isOpen: boolean) => {
    console.log(isOpen);
    setOpenCompactMode(isOpen);
  };

  const [openCompactMode, setOpenCompactMode] = useState(true);

  if (compactMode) {
    return (
      <Accordion isOpen={openCompactMode} onChangeOpen={handleOnChangeOpen}>
        <AccordionContent
          className="w-full flex flex-col pb-4 space-x-2 space-y-2 border shadow-md rounded-b-xl rounded-tl-xl border-orange-950 bg-gray-50"
          showAfterHideItem={2}
        >
          <div className="flex items-center justify-center px-4 mb-1 bg-orange-100 border border-l-orange-500 border-b-orange-500 bg-opacity-95 w-fit place-self-end rounded-bl-2xl">
            <TooltipStarRating
              className="[&>*:not(:first-child)]:bg-slate-950"
              currentRating={selectedAudio.commonRating}
              onClickStar={handleOnClickStar}
              size={8}
            >
              <div className="flex items-center justify-center">
                <TapableButton className="flex items-center justify-center">
                  <StarFilledIcon className="self-center text-orange-500 size-8" />
                </TapableButton>
              </div>
            </TooltipStarRating>

            <span className="italic font-bold text-orange-500 rounded-full text-md md:text-res-sm">
              {Math.round((selectedAudio.commonRating + Number.EPSILON) * 10) /
                10}
            </span>
          </div>
          <div>
            <AudioBookPlaylist
              className="px-2"
              audios={audioBooks}
              currentAudio={selectedAudio}
              onClickAudioBook={handleOnClickAudioBook}
            />
            {children}
          </div>
          <div className="flex items-center justify-center">
            <AudioPlayer
              src={selectedAudio.srcAudio}
              onError={(e) => onError("ошибка при загрузке озвучки")}
            />
            {!openCompactMode && (
              <motion.div
                className="flex justify-center items-center pt-3 space-x-2 mr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TooltipStarRating
                  className="[&>*:not(:first-child)]:bg-slate-950"
                  currentRating={selectedAudio.commonRating}
                  onClickStar={handleOnClickStar}
                  size={8}
                >
                  <TapableButton className="flex items-center justify-center self-center rounded-full bg-orange-100 p-1 border border-orange-500">
                    <StarFilledIcon className="text-orange-500 size-7" />
                  </TapableButton>
                </TooltipStarRating>
              </motion.div>
            )}
            <TapableButton
              onClick={() => {
                setOpenCompactMode(!openCompactMode);
              }}
              className="absolute"
            >
              <span>{openCompactMode ? "скрыть" : "показать"}</span>
            </TapableButton>

            <AudioBookPlaylist
              size="compact"
              className="px-2 [&_svg]:hidden"
              audios={audioBooks}
              currentAudio={selectedAudio}
              onClickAudioBook={handleOnClickAudioBook}
            />
          </div>
        </AccordionContent>
      </Accordion>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center pb-4 space-x-2 space-y-2 border shadow-md rounded-b-xl rounded-tl-xl border-orange-950 bg-gray-50">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center px-4 mb-1 bg-orange-100 border border-l-orange-500 border-b-orange-500 bg-opacity-95 w-fit place-self-end rounded-bl-2xl">
            <TooltipStarRating
              className="[&>*:not(:first-child)]:bg-slate-950"
              currentRating={selectedAudio.commonRating}
              onClickStar={handleOnClickStar}
              size={8}
            >
              <div className="flex items-center justify-center">
                <TapableButton className="flex items-center justify-center">
                  <StarFilledIcon className="self-center text-orange-500 size-8" />
                </TapableButton>
              </div>
            </TooltipStarRating>

            <span className="italic font-bold text-orange-500 rounded-full text-md md:text-res-sm">
              {Math.round((selectedAudio.commonRating + Number.EPSILON) * 10) /
                10}
            </span>
          </div>
          <AudioBookPlaylist
            className="px-2"
            audios={audioBooks}
            currentAudio={selectedAudio}
            onClickAudioBook={handleOnClickAudioBook}
          />
          {children}
        </div>

        <AudioPlayer
          src={selectedAudio.srcAudio}
          onError={(e) => onError("ошибка при загрузке озвучки")}
        />
      </div>
    </div>
  );
};
export default AudioBook;
