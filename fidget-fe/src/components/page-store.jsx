import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import StoreList from "./store-list.jsx";
import { BasketContext, BasketUpdateContext } from "../App.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const drawerWidth = 240;
  const [basket, setBasket] = useContext(BasketContext);
  const [basketChanged, setBasketChanged] = useContext(BasketUpdateContext);
  const [itemsBasket, setItemsBasket] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setItemsBasket(basket.length);
  }, [basketChanged]); 

  const handleReviewCheckout = () => {
    navigate("/store/basket")
  }
  
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
        <h2 className="merchStore">Merch Store</h2>
        <h3 className="merchText">All clothing items are lovingly hand printed by the band and our manager Emily! We are committed to using recycled and sweatshop free materials wherever possible.</h3> 
        <StoreList />
        <h3 className="basketContains">Your basket contains {itemsBasket} items</h3>
        {itemsBasket > 0 ? <>
        <button className="reviewCheckout" onClick={handleReviewCheckout}>Review and checkout </button></> : <></>}
      </Box>
    </>
  );
};

export default Store;
