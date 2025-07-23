import "../App.css";
import { useState, useContext, useEffect, Fragment } from "react";
import DrawerNav from "./draw-nav.jsx";  
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import { GigsContext } from "../App.jsx";
import Button from "@mui/material/Button";

const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});


  const Gigs = () => {
    const [isList, setIsList] = useState(true);
    const [gigsData, setGigsData] = useContext(GigsContext);
    const [revGigs, setRevGigs] = useState([]);
    const drawerWidth = 150;
    const navigate = useNavigate();
    
    const handleTileList = () => {
      isList === true ? setIsList(false) : setIsList(true);
    };
    
  useEffect ((
  ) => {
        axiosBase.get("gigs")
        .then(( allGigs ) => {
          setGigsData(allGigs.data);
          setRevGigs(allGigs.data.reverse());
      })
      .catch((err) => {
        console.error("Problem fetching gigs data", err);
      });
  }, []) 

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          padding: 0,
        }}
      >
        <DrawerNav />
        <div className="pageGradientWrapper">
          <div className="pageGigsHeadings">
            <h2> Upcoming shows</h2>
          </div>
        </div>
        <div className="tileOrList">
          <select defaultValue="Show list" onChange={handleTileList}>
            <option>Show list</option>
            <option>Show tiles</option>
          </select>
        </div>
        <div>
          {gigsData.map((gig) => {
            const gigDate = new Date(gig.date);
            let currentDate = new Date();
            if (gigDate >= currentDate) {
              return (
                <Fragment key={gig._id}>
                  {isList ? (
                    <Fragment key={`ListItem${gig._id}`}>
                      <div className="gigListItem">
                        <button
                          onClick={() => {
                            navigate(`/gigs/${gig._id}`);
                          }}
                        >
                          <h3>{`${gigDate.getDate()}-${gigDate.getMonth()}-${gigDate.getFullYear()}`}</h3>
                          <h3>{gig.location}</h3>

                          <Button
                            id="ticketLink"
                            draggable="false"
                            href={gig.ticketLink}
                            target="_blank"
                            variant="contained"
                            sx={{
                              color: "##FAEBD7",
                              backgroundColor: "rgba(250, 235, 215, 0.15)",
                              fontFamily: "AveriaSansLibre-Bold",
                              "&:hover": { backgroundColor: "#d15c2a" },
                            }}
                          >
                            TICKETS
                          </Button>
                        </button>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment key={`GigNav${gig.gig_id}`}>
                      <div className="buttonFlier">
                        <button
                          className="gigButton"
                          onClick={() => {
                            navigate(`/gigs/${gig._id}`);
                          }}
                          value={gig._id}
                        >
                          <div id="gigTileDateLocation">
                            <h3>
                              {`${gigDate.getDate()}-${gigDate.getMonth()}-${gigDate.getFullYear()}`}
                            </h3>
                            <h3>{gig.location}</h3>
                          </div>
                          <h3>{gig.title}</h3>
                        </button>
                        <img src={gig.flier} width="98%" />
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              );
            }
          })}
        </div>
        <div className="pageGigsHeadings">
          <h2> Past shows</h2>
        </div>
        <div>
          {revGigs.map((gig) => {
            const gigDate = new Date(gig.date);
            let currentDate = new Date();
            if (gigDate < currentDate) {
              return (
                <Fragment key={`PastGig${gig._id}`}>
                  {isList ? (
                    <Fragment key={`PastGigItem${gig.gig_id}`}>
                      <div className="pastGigListItem">
                        <button
                          onClick={() => {
                            navigate(`/gigs/${gig._id}`);
                          }}
                        >
                          <h3>{`${gigDate.getDate()}-${gigDate.getMonth()}-${gigDate.getFullYear()}`}</h3>
                          <h3>{gig.location}</h3>
                          <a href={gig.ticketLink}>Get tickets</a>
                        </button>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment key={`PastGigNav${gig.gig_id}`}>
                      <div className="buttonFlier">
                        <button
                          className="gigButton"
                          onClick={() => {
                            navigate(`/gigs/${gig._id}`);
                          }}
                          value={gig._id}
                        >
                          <div id="gigTileDateLocation">
                            <h3>
                              {`${gigDate.getDate()}-${gigDate.getMonth()}-${gigDate.getFullYear()}`}
                            </h3>
                            <h3>{gig.location}</h3>
                          </div>
                          <h3>{gig.title}</h3>
                        </button>
                        <img src={gig.flier} width="98%" />
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              );
            }
          })}
        </div>
      </Box>
    </>
  );
};

export default Gigs;