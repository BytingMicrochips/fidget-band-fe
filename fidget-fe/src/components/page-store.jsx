import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import StoreList from "./store-list.jsx";
import {ShoppingListContext } from "../App.jsx";
import { useContext} from "react";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const drawerWidth = 240;
  const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
  const navigate = useNavigate();

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
        <h3 className="merchText">
          All clothing items are lovingly hand printed by the band and our
          manager Emily! We are committed to using recycled and sweatshop-free
          materials wherever possible.
        </h3>
        <StoreList />
        <h3 className="basketContains">
          Your basket contains {shoppingList.length} items
        </h3>
        {shoppingList.length > 0 ? (
          <>
            <button className="reviewCheckout" onClick={handleReviewCheckout}>
              Review and checkout
            </button>
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default Store;
