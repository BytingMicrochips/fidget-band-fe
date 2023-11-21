import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import StoreList from "./store-list.jsx";
import { BasketContext, BasketUpdateContext } from "../App.jsx";
import { useContext, useEffect, useState } from "react";

const Store = () => {
  const drawerWidth = 240;
  const [basket, setBasket] = useContext(BasketContext);
  const [basketChanged, setBasketChanged] = useContext(BasketUpdateContext);
  const [itemsBasket, setItemsBasket] = useState(0);

  useEffect(() => {
    setItemsBasket(basket.length);
  }, [basketChanged]); 
  
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
        <h3>basket contains {itemsBasket} items</h3>
      </Box>
    </>
  );
};

export default Store;
