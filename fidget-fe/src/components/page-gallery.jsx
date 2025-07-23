import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import QuiltedImageList from "./image-list.jsx";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import smallLoading  from "../assets/smallLoading.gif";
import { Fragment } from "react";

const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});

const Gallery = () => {
  const drawerWidth = 150;
  const [videosData, setVideosData] = useState([
    {
      _id: "67846ccf96dda6a332c154f0",
      source:
        "https://www.youtube.com/embed/videoseries?si=mv4ngqKT23QKjT71&amp;list=PLUb4Caz5HphtVx2M2b7T_a9GAeYSTcSjz",
      title: "Highlights from the Fidget and the Twitchers Youtube channel",
    },
  ]);

  // useEffect(() => {
  //   axiosBase
  //     .get("videos")
  //     .then((fetchedPlaylist) => {
  //       setVideosData(fetchedPlaylist.data);
  //     })
  //     .catch((err) => {
  //       console.error("Problem fetching video playlist, using default", err);
  //     });
  // }, []);

    return (
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: "fit-content",
            padding: 0,
          }}
        >
          <DrawerNav />
          <div className="pageGradientWrapper">
            <div className="pageGigsHeadings">
              <h2> Music & Gallery</h2>
            </div>
          </div>
          <div className="bandcampPlayer">
            <iframe

              src="https://bandcamp.com/EmbeddedPlayer/album=96665267/size=large/bgcol=333333/linkcol=e99708/tracklist=true/artwork=small/transparent=true/"
              seamless
            >
              <a href="https://fidgetandthetwitchers.bandcamp.com/album/cant-sit-straight">
                Can&#39;t Sit Straight by Fidget and the Twitchers
              </a>
            </iframe>
          </div>
          <div className="ImageQuiltWrapper">
            <QuiltedImageList />
          </div>
          {videosData.length > 0 ? (
            <Fragment>
              <iframe
                className="bandcampPlayer"
                width="96%"
                height="310px"
                src="https://bandcamp.com/EmbeddedPlayer/album=4223751233/size=large/bgcol=333333/linkcol=e99708/artwork=small/transparent=true/"
                seamless
              >
                <a href="https://fidgetandthetwitchers.bandcamp.com/album/full-steam-ahead">
                  Full Steam Ahead by Fidget and the Twitchers
                </a>
              </iframe>
              <div className="galleryVids">
                <iframe
                  width="96%"
                  height="315"
                  src={`https://www.youtube.com/embed/videoseries?${videosData[0].source}`}
                  title={videosData.title}
                  frameBorder="0"
                  allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  rel="0"
                  autoPlay="1"
                  fs="0"
                  iv_load_policy="3"
                />
              </div>
            </Fragment>
          ) : (
            <img src={smallLoading} height="315" alt="Video feed loading" />
          )}
        </Box>
      </>
    );
}


export default Gallery;