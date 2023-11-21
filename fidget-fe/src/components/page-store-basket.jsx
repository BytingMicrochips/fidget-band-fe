import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import { BasketContext, BasketUpdateContext } from "../App.jsx";
import { useContext, useEffect, useState } from "react";

const StoreBasket = () => {
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
          <h1>page - store / basket</h1>
        </Box>
      </>
    );
}

export default StoreBasket;