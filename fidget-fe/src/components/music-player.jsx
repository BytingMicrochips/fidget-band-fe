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
import whiskyMystic from "../assets/musicPlayer/whiskyMystic.mp3";
import contraband from "../assets/musicPlayer/contraband.mp3";
import whiteLogo from "../assets/whiteLogo.jpg";
import contrabandCover from "../assets/musicPlayer/contrabandCover.jpg"; 
import fullSteamAheadCover from "../assets/musicPlayer/fullSteamAheadCover.jpg"; 
import cantSitStraightCover from "../assets/musicPlayer/cantSitStraightCover.jpg"; 
import blackVoodooMagic from "../assets/musicPlayer/blackVoodooMagic.mp3"; 

import { useEffect, useState } from "react";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";

const trackList = [
  {
    title: "Whisky Mystic",
    artist: "Fidget & the Twitchers",
    album: "Can't sit straight",
    source: whiskyMystic,
    coverArt: cantSitStraightCover,
    imageAlt: "Can't sit straight cover",
    buyLink: "",
  },
  {
    title: "Stick 'em up",
    artist: "Fidget & the Twitchers",
    album: "Can't sit straight",
    source: stickEm,
    coverArt: cantSitStraightCover,
    imageAlt: "Can't sit straight cover",
    buyLink: "",
  },
  {
    title: "Contraband Circus",
    artist: "Fidget & the Twitchers",
    album: "Contraband Circus",
    source: contraband,
    coverArt: contrabandCover,
    imageAlt: "Contraband Circus single cover",
    buyLink:
      "https://fidgetandthetwitchers.bandcamp.com/track/contraband-circus-2",
  },
  {
    title: "Black Voodoo Magic",
    artist: "Fidget & the Twitchers",
    album: "Full Steam Ahead",
    source: blackVoodooMagic,
    coverArt: fullSteamAheadCover,
    imageAlt: "Full Steam Ahead cover",
    buyLink:
      "https://fidgetandthetwitchers.bandcamp.com/track/black-voodoo-magic?action=download",
  }
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
  const [playlist, setPlaylist] = useState(trackList);
  const [audio, setAudio] = useState(new Audio(playlist[currentTrack].source));
  const [userVolume, setUserVolume] = useState(1)
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0);
  const [radioOn, setRadioOn] = useState(false)
  const [allAlbums, setAllAlbums] = useState([])
  const [selectedAlbum, setSelectedAlbum] = useState("all");

useEffect(() => {
  const foundAlbums = ["all"];
  trackList.map((track) => {
    if (!foundAlbums.includes(track.album)) {
      foundAlbums.push(track.album);
    }
  });
  setAllAlbums(foundAlbums)
}, []);

audio.ontimeupdate = (event) => {
    setPosition(audio.currentTime)
};    

audio.onloadedmetadata = (event) => {
    setDuration(audio.duration)
}

audio.onended = () => {
    if (currentTrack === playlist.length-1) {
      setPlaylist(trackList)
      setSelectedAlbum("all")
    }
    handleSkipNext();
}
useEffect(() => {
    audio.volume = userVolume
},[userVolume])
    
useEffect(() => {
  setAudio(new Audio(playlist[currentTrack].source));
  radioOn ? setPaused(false) : setPaused(true)
}, [currentTrack])  
    
useEffect(() => {
  audio.volume = userVolume
  paused ? audio.pause() : audio.play();
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
        playingNow < playlist.length - 1 ? setCurrentTrack(playingNow + 1) : setCurrentTrack(0);  
}

const handleSkipPrev = () => {
        audio.pause()
        audio.currentTime = 0
        setPaused(true)
        let playingNow = currentTrack
        playingNow === 0 ? setCurrentTrack(playlist.length - 1) : setCurrentTrack(playingNow - 1);
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

const handleAlbumSelect = (e) => {
  setCurrentTrack(0);
  setSelectedAlbum(e.currentTarget.value)
}
  
  useEffect(() => {
  if (selectedAlbum === "all") {
    setPlaylist(trackList)
  } else {
    const onlySelected = trackList.filter((eachTrack) => {
      return eachTrack.album === selectedAlbum
    })
    setPlaylist(onlySelected)
  }
}, [selectedAlbum])

useEffect(() => {
  audio.pause()
  setAudio(new Audio(playlist[currentTrack].source));
  if (radioOn) {
    setPaused(false)
    setTimeout(audio.play, 1000)
  } 
  }, [playlist, currentTrack])
function formatDuration(duration) {
      const minute = Math.floor(duration / 60);
      const secondLeft = Math.floor(duration) - minute * 60;
      return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
}
    
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
      theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
 
const preventDragHandler = (e) => {
  e.preventDefault();
};

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CoverImage>
            <img
              onDragStart={preventDragHandler}
              alt={playlist[currentTrack].imageAlt}
              src={playlist[currentTrack].coverArt}
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
              <b>{playlist[currentTrack].title}</b>
            </Typography>
            <Typography noWrap letterSpacing={-0.25}>
              {playlist[currentTrack].album}
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={audio.currentTime / duration}
          min={0}
          step={1 / duration}
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
        <Box
          className="albumSelect"
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          {allAlbums.map((eachAlbum) => {
            const match = trackList.find((track) => track.album === eachAlbum);
            return match ? (
              <>
                <div className="eachAlbum">
                  <button value={eachAlbum} onClick={handleAlbumSelect}>
                    <img
                      src={match.coverArt}
                      alt={match.imageAlt}
                      onDragStart={preventDragHandler}
                    />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="eachAlbum">
                  <button value="all" onClick={handleAlbumSelect}>
                    <img
                      src={whiteLogo}
                      alt="White band logo"
                      onDragStart={preventDragHandler}
                    />
                  </button>
                </div>
              </>
            );
          })}
        </Box>
      </Widget>
      {playlist[currentTrack].buyLink === "" ? (
        <>

        </>
      ) : (
        <>
          <div className="buyTrack">
            <a href={playlist[currentTrack].buyLink}>
              Support us by purchasing this track
            </a>
            <div className="shareTrack">
              <h3>Share this track with your friends</h3>
              <FacebookShareButton
                url={playlist[currentTrack].buyLink}
                hashtag="#ukskapunk"
                className="socialShareButton"
              >
                <FacebookIcon size={36} />
              </FacebookShareButton>
              <TwitterShareButton
                url={playlist[currentTrack].buyLink}
                hashtag="#ukskapunk"
                className="socialShareButton"
              >
                <TwitterIcon size={36} />
              </TwitterShareButton>
              <WhatsappShareButton
                url={playlist[currentTrack].buyLink}
                hashtag="#ukskapunk"
                className="socialShareButton"
              >
                <WhatsappIcon size={36} />
              </WhatsappShareButton>
            </div>
          </div>
        </>
      )}
    </Box>
  );
}

