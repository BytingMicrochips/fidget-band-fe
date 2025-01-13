import gigsData from "../../data/gigs-data.json";
import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { GigsContext } from "../App.jsx";

const GigsGig_id = () => {
  const params = useParams();
  const [gigsData, setGigsData] = useContext(GigsContext);
  const drawerWidth = 150;
  const [thisGig, setThisGig] = useState({});
  const navigate = useNavigate();

useEffect(() => {
  gigsData.filter((eachGig) => {
    if (eachGig._id === params._id) {
      setThisGig(eachGig)
    }
  })
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
          <div className="gigs-gig_id">
            <h2> {thisGig.title}</h2>
            <div className="gigs_idLocationVenue">
              <h3>{thisGig.location}</h3>
              <h3>{thisGig.venue}</h3>
            </div>

            <h3 className="gigs_idDate">{`${new Date(thisGig.date).getDate()}-${new Date(
              thisGig.date
            ).getMonth()}-${new Date(thisGig.date).getFullYear()}`}</h3>
            <img src={thisGig.flier} />
            <h3> {thisGig.description}</h3>
            <div className="gigs_idlinks">
              <a href={thisGig.ticketLink}>Buy tickets</a>
              <a
                onClick={() => {
                  navigate("/gigs");
                }}
              >
                Back to all gigs
              </a>
            </div>
          </div>
        </Box>
      </>
    );
};

export default GigsGig_id;
