import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import { BasketContext, ShoppingListContext } from "../App.jsx";
import { useContext, useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const StoreBasket = () => {
  const drawerWidth = 240;
    const [basket, setBasket] = useContext(BasketContext);
    const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
    const [order, setOrder] = useState([])
    
    useEffect(() => {
        const toOrder = basket.filter((merchItem) => (Object.values(merchItem)[0] !== 0))
        setOrder(toOrder)
    },[basket])
    
  const handleAddBasket = (e) => {
    const selected = e.currentTarget.value;
    const updatedBasket = [...basket];
    const updatedShoppingList = [e.currentTarget.value, ...shoppingList];
    setShoppingList(updatedShoppingList);
    const index = updatedBasket.findIndex(
      (stockItem) => typeof stockItem[selected] === "number"
    );
    updatedBasket[index][selected]++;
    setBasket(updatedBasket);
    setIsHidden(true);
  };

    const handleRemoveBasket = (e) => {
      console.log('handlingRemoveBasket', e.currentTarget.value)
    const selected = e.currentTarget.value;
    const updatedBasket = [...basket];
    const indexToRemove = shoppingList.indexOf(selected);
    const updatedShoppingList = [];
    for (let i = 0; i < shoppingList.length; i++) {
      if (i !== indexToRemove) {
        updatedShoppingList.push(shoppingList[i]);
      }
    }
    setShoppingList(updatedShoppingList);
    const index = updatedBasket.findIndex(
      (stockItem) => typeof stockItem[selected] === "number"
    );
    if (updatedBasket[index][selected] > 0) {
      updatedBasket[index][selected]--;
      setBasket(updatedBasket);
    }
    setIsHidden(true);
  };

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
          <h1>Your order</h1>
          <div className="basketWrapper">
            {order.length === 0 ? (
              <>
                <em>no items currently in basket</em>
              </>
            ) : (
              <>
                {order.map((eachItem) => {
                  return (
                    <>
                      <div className="basketItem">
                        <h2>{Object.keys(eachItem)[0]}</h2>
                        <div className="basketQuantity">
                          <button
                            aria-label={`Remove one ${Object.keys(eachItem)[0]} from basket`}
                            onClick={handleRemoveBasket}
                            value={Object.keys(eachItem)[0]}>
                            <IndeterminateCheckBoxIcon sx={{ width: 30, height: 30 }}/>
                          </button>
                          <h2 aria-label={`Quantity of ${Object.keys(eachItem)[0]} in basket`}>{Object.values(eachItem)[0]}</h2>
                          <button
                            aria-label={`Add another ${Object.keys(eachItem)[0]} to basket`}
                            onClick={handleAddBasket}
                            value={Object.keys(eachItem)[0]}>
                            <AddBoxIcon sx={{ width: 30, height: 30 }} />
                          </button>
                        </div>
                        <h2>cost</h2>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </Box>
      </>
    );
}

export default StoreBasket;