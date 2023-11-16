import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";

import stickEm from "../assets/musicPlayer/stickEm.mp3";
import landlord from "../assets/musicPlayer/landlord.mp3";
import whiteLogo from "../assets/whiteLogo.jpg";

import { useEffect, useState } from "react";

const trackList = [
  {
    title: "Mr Landlord",
    artist: "Fidget & the Twitchers",
    album: "Can't sit straight",
    source: landlord,
    coverArt: whiteLogo,
    imageAlt: "White band logo",
  },
  {
    title: "Stick 'em up",
    artist: "Fidget & the Twitchers",
    album: "Can't sit straight",
    source: stickEm,
    coverArt: whiteLogo,
    imageAlt: "White band logo",
  },
]; 

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
  theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function MusicPlayerSlider() {
  const theme = useTheme();
  const [paused, setPaused] = React.useState(true);
  const [currentTrack, setCurrentTrack] = useState(0)
  const [audio, setAudio] = useState(new Audio(trackList[currentTrack].source))
  const [userVolume, setUserVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0);
  const [radioOn, setRadioOn] = useState(false)
  
audio.ontimeupdate = (event) => {
    setPosition(audio.currentTime)
};    

audio.onloadedmetadata = (event) => {
    setDuration(audio.duration)
}

  audio.onended = () => {
    handleSkipNext();
}
useEffect(() => {
    audio.volume = userVolume
},[userVolume])
    
useEffect(() => {
  setAudio(new Audio(trackList[currentTrack].source));
  radioOn? setPaused(false) : setPaused(true)
}, [currentTrack])  
    
useEffect(() => {
    audio.volume = userVolume
}, [audio])  
      
useEffect(() => {
  paused ? audio.pause() : audio.play();
  paused? setRadioOn(false) : setRadioOn(true)
}, [paused]);

const handleSkipNext = () => {
        audio.pause()
        audio.currentTime = 0
        setPaused(true)
        let playingNow = currentTrack
        playingNow < trackList.length - 1 ? setCurrentTrack(playingNow + 1) : setCurrentTrack(0);  
}

const handleSkipPrev = () => {
        audio.pause()
        audio.currentTime = 0
        setPaused(true)
        let playingNow = currentTrack
        playingNow === 0 ? setCurrentTrack(trackList.length - 1) : setCurrentTrack(playingNow - 1);
}

const handleVolume = (e, val) => {
    setUserVolume(val/100)  
}

const handleSeek = (e, val) => {
    const newPosition = val * (1 / duration)
    const seekTo = val*duration
    audio.currentTime = seekTo
    setPosition(newPosition)
};


    
    function formatDuration(duration) {
      const minute = Math.floor(duration / 60);
      const secondLeft = Math.floor(duration) - minute * 60;
      return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
 


  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CoverImage>
            <img
              alt={trackList[currentTrack].imageAlt}
              src={trackList[currentTrack].coverArt}
            />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {trackList[currentTrack].artist}
            </Typography>
            <Typography noWrap>
              <b>{trackList[currentTrack].title}</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              {trackList[currentTrack].album}
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={audio.currentTime/duration}
          min={0}
          step={1/duration}
          max={1}
          onChange={handleSeek}

          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(audio.currentTime)}</TinyText>
          <TinyText>-{formatDuration(duration - audio.currentTime)}</TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song" onClick={handleSkipPrev}>
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={() => {
              setPaused(!paused);
            }}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={handleSkipNext}>
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
                      defaultValue={100}
                      onChange={handleVolume}
                       
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
  );
}

