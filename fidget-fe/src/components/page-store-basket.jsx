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
import { Fragment } from "react";
import BasketItem from "./basketItem.jsx";
import BasketItemHasSizes from "./basketItemHasSizes.jsx";

const StoreBasket = () => {
    const drawerWidth = 150;
    const Navigate = useNavigate();
    const [basket, setBasket] = useContext(BasketContext);
    const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
    const [order, setOrder] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    
// Handle total price calculation
    useEffect(() => {
        let updatedCost = 0
        order.map((eachItem) => {
          updatedCost = updatedCost + (eachItem.amountOrdered * eachItem.price)
        })
        setTotalPrice(updatedCost);
    },[order])

// Convert basketDTO into order
    useEffect(() => {
        const toOrder = basket.filter((product) => (product.amountOrdered !== 0))
        setOrder(toOrder)
    },[basket])
    
// Handle adding more of specific item to basket
  const handleAddBasket = (e) => {
    const selected = JSON.parse(e.currentTarget.value);
    const updatedBasket = [...basket];
    const newItem = { ...selected };
    if (!selected.hasSizes) {
      newItem.requestedSize = "";
    } else {
      // newItem.requestedSize = newItem.requestedSizes[0];
      newItem.requestedSize = selected.size
    }
    // Format newItem data for shopping list
    delete newItem.requestedSizes;
    delete newItem.size;
    const updatedShoppingList = [...shoppingList, newItem];

    // Update shoppingList
    setShoppingList(updatedShoppingList);

    // Update basket
    const matchedIndex = updatedBasket.findIndex(
      (item) => item.title === selected.title
    );
    updatedBasket[matchedIndex].amountOrdered++;
    if (newItem.hasSizes === true) {
      updatedBasket[matchedIndex].requestedSizes.push(newItem.requestedSize);
    }
    setBasket(updatedBasket);
  };

  const handleRemoveBasket = (e) => {
    const selected = JSON.parse(e.currentTarget.value);
    const updatedBasket = [...basket];
    const updatedShoppingList = [...shoppingList];
  
    // Handle removing item when hasSizes === false
      // Update ShoppingList
    if (!selected.hasSizes) {
      const indexList = updatedShoppingList.findIndex(item => item.title === selected.title);
      updatedShoppingList.splice(indexList, 1);
      setShoppingList(updatedShoppingList);
      // Update Basket
      const indexBasket = updatedBasket.findIndex(item => item.title === selected.title);
      updatedBasket[indexBasket].amountOrdered--;
      setBasket(updatedBasket);
    } else {
      // Handle removing item when hasSizes === true

    }

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
          <div className="pageGradientWrapper">
            <div className="pageGigsHeadings">
              <h2>Your basket</h2>
            </div>
          </div>
          <div className="basketText">
            <h3>
              Thank you for supporting Fidget & the Twitchers! <br/>All orders are handled by the band and will
              be posted soon as we are able - your patience is appreciated
              during summer festival season. <br/> See you in the dance!
            </h3>
          </div>

          <div className="basketWrapper">
            {order.length === 0 ? (
              <>
                <em>no items currently in basket</em>
              </>
            ) : (
              <>
                  {order.map((eachItem) => {
                    console.log("🚀 ~ eachItem:", eachItem)
                    if (eachItem.hasSizes === false) {
                      return (
                    <Fragment key={eachItem.title}>
                      <BasketItem eachItem={eachItem} handleRemoveBasket={handleRemoveBasket} handleAddBasket={handleAddBasket}/>
                    </Fragment>
                      )
                    } else {
                      const uniques = [...new Set(eachItem.requestedSizes)]
                      return (uniques.map((size) => {
                        return (
                          <Fragment key={`${eachItem.title}.${size}`}>
                            <BasketItemHasSizes
                              eachItem={eachItem}
                              handleRemoveBasket={handleRemoveBasket}
                              handleAddBasket={handleAddBasket}
                              size={size}
                            />
                          </Fragment>
                        );
                      }) )
                    }
                    
                  

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
                <Button
                  variant="contained"
                  onClick={() => {
                    Navigate("/store/checkout");
                  }}
                >
                  Checkout now
                </Button>
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