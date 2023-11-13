import gigsData from "../../data/gigs-data.json";
import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";


const GigsGig_id = () => {
  const params = useParams();
  const drawerWidth = 240;


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
          <h2> Gigs - {params.gig_id}</h2>
        </Box>
      </>
    );
};

export default GigsGig_id;
