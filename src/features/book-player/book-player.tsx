import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Repeat,
  Shuffle,
  Music,
  BookIcon,
  CheckCircle,
} from "lucide-react";
import {
  BookPlayerStore,
  useBookPlayerStore,
} from "./store/use-book-player-store";

import { cn } from "@/lib/utils";

import { LyricsDisplay } from "./lyrics-display";
import { Separator } from "@/components/ui/separator";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const BookPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentTrack,
    isPlaying,
    volume,
    shuffle,
    repeat,
    playlist,
    setTrack,
    setIsPlaying,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    nextTrack,
    prevTrack,
  } = useBookPlayerStore();
  const [trackDirection, setTrackDirection] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showLyrics, setShowLyrics] = useState(false);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressChange = (newProgress: number[]) => {
    if (audioRef.current) {
      const newTime = (newProgress[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress[0]);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      const updateTime = () => setCurrentTime(audioRef.current!.currentTime);
      audioRef.current.addEventListener("timeupdate", updateTime);
      return () => {
        audioRef?.current?.removeEventListener("timeupdate", updateTime);
      };
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-background border rounded-lg shadow-lg">
      <div className="flex space-x-2">
        <h2 className="text-2xl font-bold self-center border-r-2 border-slate-300 pr-2">
          {currentTrack?.title || "No track selected"}{" "}
          {/* {currentTrack && (
            <Button
              onClick={() => setShowLyrics(!showLyrics)}
              variant={"ghost"}
              size={"icon"}
            >
              <Music
                className={
                  showLyrics ? "text-primary" : "text-muted-foreground"
                }
              />
            </Button>
          )} */}
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center md:text-left"
          >
            <p className="text-muted-foreground">
              {currentTrack?.artist || "Unknown artist"}
            </p>
            <p className="text-sm text-muted-foreground">
              {currentTrack?.album || "Unknown album"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`cover-${currentTrack?.id}-${trackDirection}`}
            className="size-24 rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              x: trackDirection === "next" ? -30 : 30,
              scale: 0.8,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-lg">
              <img
                src={currentTrack?.cover || "/img/music-notes.png"}
                alt={currentTrack?.title || "Album cover"}
                className="object-cover rounded-lg size-full"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex">
          {showLyrics ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`lyrics-${currentTrack?.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentTrack && (
                  <LyricsDisplay
                    lyrics={currentTrack.lyrics}
                    currentTime={currentTime}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex items-center">
              {/* <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
                >
                  {volume === 0 ? <VolumeX /> : <Volume2 />}
                </Button>
                <Slider
                  value={[volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={(newVolume) => setVolume(newVolume[0] / 100)}
                  className="w-full max-w-xs"
                  trackClassName="h-1"
                  thumbClassName="size-4"
                />
              </div> */}
              <div className="mt-4 w-full">
                <div className="">
                  <Slider
                    value={[progress]}
                    max={100}
                    step={0.1}
                    onValueChange={handleProgressChange}
                    className="w-full min-w-56"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>
                      {formatTime(audioRef.current?.currentTime || 0)}
                    </span>
                    <span>{formatTime(audioRef.current?.duration || 0)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleShuffle}
                    className="[&_svg]:size-7"
                  >
                    {/* <Shuffle
                      className={
                        shuffle ? "text-primary" : "text-muted-foreground"
                      }
                    /> */}
                    <CheckCircledIcon className="text-emerald-500" />

                    {/* <CheckCircle className="text-emerald-500" /> */}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setTrackDirection("previous");
                      if (!currentTrack && !isPlaying) {
                        setIsPlaying(true);
                        setTrack(playlist[playlist.length - 1]);
                        return;
                      }
                      prevTrack();
                    }}
                  >
                    <SkipBack />
                  </Button>
                  <Button
                    variant="default"
                    size="icon"
                    onClick={() => {
                      if (!currentTrack && !isPlaying) {
                        setTrackDirection("next");
                        setIsPlaying(true);
                        setTrack(playlist[0]);
                        return;
                      }
                      setIsPlaying(!isPlaying);
                    }}
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setTrackDirection("next");
                      if (!currentTrack && !isPlaying) {
                        setIsPlaying(true);
                        setTrack(playlist[0]);
                        return;
                      }
                      nextTrack();
                    }}
                  >
                    <SkipForward />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleRepeat}
                    className="[&_svg]:size-7"
                  >
                    <CrossCircledIcon className="text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Playlist</h3>
        <ul className="space-y-2">
          {playlist.map((track) => (
            <motion.li
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  currentTrack?.id === track.id ? "bg-accent" : ""
                )}
                onClick={() => {
                  setTrack(track);
                  setIsPlaying(true);
                }}
              >
                <div className="size-12 rounded mr-1 relative">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="object-fill"
                  />
                </div>
                <div className="text-left">
                  <p className="font-medium">{track.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {track.artist}
                  </p>
                </div>
              </Button>
            </motion.li>
          ))}
        </ul>
      </div> */}
      <audio
        className=""
        ref={audioRef}
        src={currentTrack?.audio}
        onEnded={nextTrack}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default BookPlayer;
