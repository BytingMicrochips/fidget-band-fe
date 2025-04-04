import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import QuiltedImageList from "./image-list.jsx";
import arrowLeft from "../assets/arrow-left.png"
import arrowRight from "../assets/arrow-right.png"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import smallLoading  from "../assets/smallLoading.gif";
import { Fragment } from "react";
import ImageCarousel from "./image-carousel.jsx";

const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});

const Gallery = () => {
  const drawerWidth = 150;
  const [videosData, setVideosData] = useState([
    {
      _id: "66846ccf96dda6a332c154f0",
      source:
        "https://www.youtube.com/embed/videoseries?si=dNmT2d0AT2suk3Di&amp;list=OLAK5uy_n9ND_7kFabhc4onTo2zAFQOuu3NG5dx7g",
      title: "Highlights from the Fidget and the Twitchers Youtube channel",
    },
  ]);

  useEffect(() => {
    axiosBase
      .get("videos")
      .then((fetchedPlaylist) => {
        setVideosData(fetchedPlaylist.data);
      })
      .catch((err) => {
        console.error("Problem fetching video playlist", err);
      });
  }, []);

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
              <h2> Media gallery</h2>
            </div>
          </div>
          <QuiltedImageList />
          {videosData.length > 0 ? (
            <Fragment>
              <div className="galleryVids">
                <iframe
                  width="96%"
                  height="315"
                  src={`https://www.youtube.com/embed/videoseries?${videosData[0].source}`}
                  title={videosData.title}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                  rel="0"
                  autoplay="1"
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