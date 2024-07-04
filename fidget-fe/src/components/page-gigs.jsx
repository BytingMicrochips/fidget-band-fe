import "../App.css";
import Header from "./header.jsx";
import MailChimp from "../components/mailChimp";
import gigsJson from "../../data/gigs-data.json";
import { useState, useContext } from "react";
import DrawerNav from "./draw-nav.jsx";  
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";
import { useEffect } from "react";

const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});


  const Gigs = () => {
    const [isList, setIsList] = useState(true);
    const [gigsData, setGigsData] = useState([])
    console.log("🚀 ~ Gigs ~ gigsData:", gigsData)
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
          padding: 0,
        }}
      >
        <DrawerNav />
        <h2> Upcoming shows</h2>
        <select
          defaultValue="Show list"
          onChange={handleTileList}
          className="tileOrList"
        >
          <option>Show list</option>
          <option>Show tiles</option>
        </select>

        <div>
          {gigsData.map((gig) => {
            const gigDate = new Date(gig.date);
            return (
              <>
                {isList ? (
                  <>
                    <div className="gigListItem">
                      <button
                        onClick={() => {
                          navigate(`/gigs/${gig.gig_id}`);
                        }}
                      >
                        <h3>{`${gigDate.getDate()}-${gigDate.getMonth()}-${gigDate.getFullYear()}`}</h3>
                        <h3>{gig.location}</h3>
                        <a href={gig.ticketLink}>Get tickets</a>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="buttonFlier">
                      <button
                        className="gigButton"
                        onClick={() => {
                          navigate(`/gigs/${gig.gig_id}`);
                        }}
                        value={gig.gig_id}
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
                  </>
                )}
              </>
            );
          })}
        </div>

        <MailChimp />
      </Box>
    </>
  );
};

export default Gigs;