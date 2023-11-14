import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";

const Music = () => {
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
                <h2>page - music</h2>;
            </Box>
        </>)
};

export default Music;
