import "../App.css";
import Header from "./header.jsx";
import MailChimp from "../components/mailChimp";
import gigsData from "../../data/gigs-data.json";
import { useState, useContext } from "react";
import { GigContext } from "../App.jsx";                       
import DrawerNav from "./draw-nav.jsx";  
import Box from "@mui/material/Box";

const Gigs = () => {
  const [isList, setIsList] = useState(true)
  const [GigSelected, setGigSelected] = useContext(GigContext);
  const drawerWidth = 240;

  const handleTileList = () => {
    isList === true ? setIsList(false) : setIsList(true)
  }
  
  const handleGigSelect = (e) => {
    setGigSelected(e.currentTarget.value);
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
        <h2> Upcoming shows</h2>
        <select
          defaultValue="Show tiles"
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
                    {isList ? (
                      <>
                        <div className="buttonFlier">
                          <button className="gigButton" onClick={handleGigSelect} value={gig.gig_id}>
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
                    ) : (
                      <>
                        <div className="gigListItem">
                          <h3>{`${gigDate.getDate()}-${gigDate.getMonth()}-${gigDate.getFullYear()}`}</h3>
                          <h3>{gig.location}</h3>
                        </div>
                        <h3>{gig.title}</h3>
                      </button>
                      <img src={gig.flier} width="98%" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="gigListItem">
                      <h3>{`${gigDate.getDate()}-${gigDate.getMonth()}-${gigDate.getFullYear()}`}</h3>
                      <h3>{gig.location}</h3>
                      <a href={gig.ticketLink}>Get tickets</a>
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