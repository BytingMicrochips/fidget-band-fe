import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import MusicPlayerSlider from "./music-player.jsx";

const Music = () => {
  const drawerWidth = 150;

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
              <h2>Music</h2>
            </div>
          </div>
          <MusicPlayerSlider />
        </Box>
      </>
    );
};

export default Music;
