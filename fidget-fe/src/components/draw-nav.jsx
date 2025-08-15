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
import { Fragment } from "react";

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
          <ListItemButton
            id="drawItem"
            defaultValue="Home"
            aria-label="Navigate to home"
          >
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
          <ListItemButton
            id="drawItem"
            defaultValue="Gigs"
            aria-label="Navigate to gigs"
          >
            <ListItemText primary="Gigs" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/musicandgallery");
          }}
        >
          <ListItemButton
            id="drawItem"
            defaultValue="Music & Gallery"
            aria-label="Navigate to music and gallery"
          >
            <ListItemText
              primary={
                <div>
                  Music &
                  <br />
                  Gallery
                </div>
              }
            />
          </ListItemButton>
        </ListItem>

        <Divider />
        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/store");
          }}
        >
          <ListItemButton
            id="drawItem"
            defaultValue="Store"
            aria-label="Navigate to store"
          >
            <ListItemText primary="Store" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/store/basket");
          }}
        >
          <ListItemButton
            id="drawItem"
            defaultValue="Basket"
            aria-label="Navigate to basket"
          >
            <ListItemText primary="Basket" />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/contact");
          }}
        >
          <ListItemButton
            id="drawItem"
            defaultValue="EPK & Contact Us"
            aria-label="Navigate to EPK & Contact Us"
          >
            <ListItemText
              primary={
                <div>
                  Contact Us
                  <br />
                  EPK
                </div>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
      <ThemeProvider theme={darkTheme}>
      <Box
          sx={{
            display: "flex",
          }}
        >
          <CssBaseline />
          <IconButton
            id="hamburger"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              color: "#FAEBD7",
              "&:hover": {
                color: "#D15C2A",
                bgcolor: "#0d0d0d",
              },
              "&:focus  ": {
                outlineColor: "#0d0d0d",
              },
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
                  background:
                    "linear-gradient(90deg, rgba(13,13,13,1) 40%, rgba(13,13,13,0.25) 100%)",
                }
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
