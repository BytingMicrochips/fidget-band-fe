import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";


function DrawerNav(props) {
  const drawerWidth = 150;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      fontFamily: [
        'CabinSketch-Bold'
      ]
    }
  });
  
  const drawer = (
    <div>
      <Divider />
      <List>
        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/home");
          }}
        >
          <ListItemButton defaultValue="Home" aria-label="Navigate to home">
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/gigs");
          }}
        >
          <ListItemButton defaultValue="Gigs" aria-label="Navigate to gigs">
            <ListItemText primary="Gigs" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/gallery");
          }}
        >
          <ListItemButton
            defaultValue="Music & media"
            aria-label="Navigate to music and media"
          >
            <ListItemText primary="Music" />
          </ListItemButton>
        </ListItem>

        <Divider />
        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/store");
          }}
        >
          <ListItemButton defaultValue="Store" aria-label="Navigate to store">
            <ListItemText primary="Store" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/store/basket");
          }}
        >
          <ListItemButton defaultValue="Basket" aria-label="Navigate to basket">
            <ListItemText primary="Basket" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <IconButton
          color="purple"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            display: { sm: "none" },
            margin: 0,
            borderRadius: 0,
            backgroundColor: "#0d0d0d",
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="Site navigation"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                // backgroundColor: "#7F00FF",
                background: 'linear-gradient(90deg, rgba(13,13,13,1) 40%, rgba(13,13,13,0.25) 100%)'
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Header />
      </Box>
    </ThemeProvider>
  );
}

export default DrawerNav;
