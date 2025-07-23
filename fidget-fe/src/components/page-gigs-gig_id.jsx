import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, Fragment } from "react";
import { GigsContext } from "../App.jsx";
import axios from "axios";
import pressShot from "../assets/outdoor-press-shot.jpg"

const GigsGig_id = () => {
  const params = useParams();
  const [gigsData, setGigsData] = useContext(GigsContext);
  const drawerWidth = 150;
  const [thisGig, setThisGig] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const axiosBase = axios.create({
    baseURL: "https://fidget-band-be.onrender.com/api/",
  });

  
  useEffect(() => {
  
    if (gigsData.length === 0) {
      setIsLoading(true);
      fetchSingleGig(params._id);
    } else {
      gigsData.filter((eachGig) => {
        if (eachGig._id === params._id) {
          setThisGig(eachGig);
          setIsLoading(false);
        }
      })
    }
  }, [])
  
  const fetchSingleGig = async (_id) => {
    try {
      return  axiosBase
      .get(`gigs/${_id}`, {
      })
      .then((matchedGig) => {
        setThisGig(matchedGig.data.gig[0]);
          setIsLoading(false);
      })
    } catch (err){
      console.log(err)
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

        {isLoading ? (
          <>
            <div className="gigs-gig_id">
              <div className="gradientGigsId">
                <h1>Loading</h1>
                <div className="gigs_idlinks">
                  <a
                    onClick={() => {
                      navigate("/gigs");
                    }}
                    draggable="false"
                  >
                    Back to all gigs
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="gigs-gig_id">
                <div className="gradientGigsId">
                  <div className="pageGigsHeadings">
                <h2 id="thisGigTitle"> {thisGig.title}</h2>
                  </div>
              </div>
              <div className="gigs_idLocationVenue">
                <h3>{thisGig.location}</h3>
                <h3>{thisGig.venue}</h3>
              </div>
              <h3 className="gigs_idDate">{`${new Date(
                thisGig.date
              ).getDate()}-${new Date(thisGig.date).getMonth()}-${new Date(
                thisGig.date
              ).getFullYear()}`}</h3>
              {thisGig.flier.length === 0 ? (
                <img src={pressShot} draggable="false" />
              ) : (
                <img src={thisGig.flier} draggable="false" />
              )}
              <h3 id="thisGig-desc-text"> {thisGig.description}</h3>

              <div className="gigs_idlinks">
                <a href={thisGig.ticketLink} draggable="false">
                  Buy tickets
                </a>
                <a
                  onClick={() => {
                    navigate("/gigs");
                  }}
                  draggable="false"
                >
                  Back to all gigs
                </a>
              </div>
            </div>
          </>
        )}
      </Box>
    </>
  );
};

export default GigsGig_id;
