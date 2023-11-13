import gigsData from "../../data/gigs-data.json";
import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const GigsGig_id = () => {
  const params = useParams();
  const drawerWidth = 240;
  const [thisGig, setThisGig] = useState({});
  const navigate = useNavigate();

useEffect(() => {
  gigsData.filter((eachGig) => {
    if (eachGig.gig_id === params.gig_id) {
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
          <h2> {thisGig.title}</h2>
          <div>
            <h3>{thisGig.location}</h3>
            <h3>{thisGig.venue}</h3>
          </div>

          <h3>{`${new Date(thisGig.date).getDate()}-${new Date(thisGig.date).getMonth()}-${new Date(thisGig.date).getFullYear()}`}</h3>
          <img src={thisGig.flier} />
          <h3> {thisGig.description}</h3>
          <div>
          <a href={thisGig.ticketLink}>Buy tickets</a>
            <a onClick={() => { navigate("/gigs") }}>Back to all gigs</a>
            </div>
        </Box>
      </>
    );
};

export default GigsGig_id;
