import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import StoreList from "./store-list.jsx";
import { BasketContext } from "../App.jsx";
import { useContext } from "react";

const Store = () => {
  const drawerWidth = 240;
  const [basket, setBasket] = useContext(BasketContext);

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
        <h2>page - store</h2>
        <StoreList />
      </Box>
    </>
  );
};

export default Store;
