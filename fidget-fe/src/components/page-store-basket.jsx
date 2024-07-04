import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import { BasketContext, ShoppingListContext } from "../App.jsx";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MailChimp from "./mailChimp.jsx";

const StoreBasket = () => {
    const drawerWidth = 150;
    const Navigate = useNavigate();
    const [basket, setBasket] = useContext(BasketContext);
    const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
    const [order, setOrder] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    
    useEffect(() => {
        let updatedCost = 0
        order.map((eachItem) => {
            updatedCost = updatedCost + Object.values(eachItem)[0] * Object.values(eachItem)[1];
        })
        setTotalPrice(updatedCost);
    },[order])


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
          <h2 className="yourOrder">Your order</h2>
          <div className="basketText">
            <h3>Thank you for supporting Fidget & the Twitchers!</h3>
            <h3>
              All orders will be posted soon as we are able - your patience is
              appreciated during summer festival season.
            </h3>
            <h3> See you in the dance!</h3>
          </div>
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
                        <div className="quantityAndPrice">
                          <div className="basketQuantity">
                            <button
                              aria-label={`Remove one ${
                                Object.keys(eachItem)[0]
                              } from basket`}
                              onClick={handleRemoveBasket}
                              value={Object.keys(eachItem)[0]}
                            >
                              <IndeterminateCheckBoxIcon
                                sx={{ width: 30, height: 30 }}
                              />
                            </button>
                            <h2
                              aria-label={`Quantity of ${
                                Object.keys(eachItem)[0]
                              } in basket`}
                            >
                              {Object.values(eachItem)[0]}
                            </h2>
                            <button
                              aria-label={`Add another ${
                                Object.keys(eachItem)[0]
                              } to basket`}
                              onClick={handleAddBasket}
                              value={Object.keys(eachItem)[0]}
                            >
                              <AddBoxIcon sx={{ width: 30, height: 30 }} />
                            </button>
                          </div>
                          <h2 className="itemCost">
                            £
                            {Object.values(eachItem)[0] *
                              Object.values(eachItem)[1]}
                          </h2>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
            <div className="totalWrapper">
              <h2>Order total: £{totalPrice}</h2>
            </div>
            <div className="basketNav">
              <Stack direction="column" spacing={1.5}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    Navigate("/store");
                  }}
                >
                  Return to store
                </Button>
                <Button variant="contained" onClick={()=>{Navigate("/store/checkout");}}>Checkout now</Button>
              </Stack>
            </div>
          </div>
          <div className="mailChimpBasket">
            <MailChimp />
          </div>
        </Box>
      </>
    );
}

export default StoreBasket;