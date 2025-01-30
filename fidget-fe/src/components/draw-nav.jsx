import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import { ThemeProvider, createTheme } from "@mui/material/styles";


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
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
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
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
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
            defaultValue="Gallery"
            aria-label="Navigate to gallery"
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Gallery" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding={true}
          onClick={() => {
            navigate("/music");
          }}
        >
          <ListItemButton defaultValue="Music" aria-label="Navigate to music">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
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
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
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
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Basket" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex"}}>
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
