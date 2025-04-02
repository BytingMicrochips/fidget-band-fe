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

const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});

const Gallery = () => {
  const drawerWidth = 150;
  const [whichVideo, setWhichVideo] = useState(0)
  const [videosData, setVideosData] = useState([  {
    _id: "66846ccf96dda6a332c154f0",
    source: "https://www.youtube.com/embed/CFNc5MWu65o?si=NDfXhe500QCk8GDN",
    title: "Contraband Circus (studio version)",
    date: "2023-11-09",
  }])

  useEffect(() => {
    axiosBase
      .get("videos")
      .then((allVids) => {
        setVideosData(allVids.data);
      })
      .catch((err) => {
        console.error("Problem fetching video data", err);
      });
  }, []);

    const handlePreviousVid = () => {
        let currentVid = whichVideo
        if (currentVid >= 1) {
            setWhichVideo(currentVid-1);
        } else {
          setWhichVideo(videosData.length - 1);
        }
    }

    const handleNextVid = () => {
        let currentVid = whichVideo;        
        if (currentVid >= videosData.length - 1) {
          setWhichVideo(0);
        } else {
          setWhichVideo(currentVid+1);
        }
    }

    return (
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
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
                <div className="videoButtons">
                  <iframe
                    width="96%"
                    height="315"
                    src={videosData[whichVideo].source}
                    title={videosData[whichVideo].title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  />
                  <div className="imageButtonVideo">
                    <button
                      onClick={handlePreviousVid}
                      aria-label="skip previous video"
                    >
                      <div className="vidArrowLabel">
                        <img src={arrowLeft} />
                        <h4>Previous</h4>
                      </div>
                    </button>
                    <button
                      onClick={handleNextVid}
                      aria-label="skip next video"
                    >
                      <div className="vidArrowLabel">
                        <img src={arrowRight} />
                        <h4>Next</h4>
                      </div>
                    </button>
                  </div>
                </div>
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