import React, { useEffect } from "react";
import { useAudioPlayer } from "../hooks/use-audioplayer";
import { useAudioContext } from "./audio.provider";
import styled from "styled-components";

const PlayButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 16px;
`;

const PlayerControls = styled.div`
  display: flex;
  justify-content: center;
`;

const TrackList = styled.div`
  display: grid;
  gap: 16px;
`;

export const GlobalAudioPlayer = () => {
  const audioContext = useAudioContext();

  if (!audioContext) return null;

  const { currentTrack, isGlobalPlaying } = audioContext;

  if (!currentTrack) return null;

  const {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    seek,
  } = useAudioPlayer(currentTrack);

  useEffect(() => {
    if (currentTrack && isGlobalPlaying) {
      play();
    } else {
      pause();
    }
  }, [currentTrack, isGlobalPlaying]);

  return (
    <PlayerContainer>
      <div>{currentTrack}</div>
      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
      />
      <PlayerControls>
        <PlayButton onClick={isPlaying ? pause : play}>
          {isPlaying ? "Pause" : "Play"}
        </PlayButton>
      </PlayerControls>
    </PlayerContainer>
  );
};
