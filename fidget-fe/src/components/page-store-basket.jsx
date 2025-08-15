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

const StoreBasket = () => {
    const drawerWidth = 150;
    const Navigate = useNavigate();
    const [basket, setBasket] = useContext(BasketContext);
    console.log("🚀 ~ StoreBasket ~ basket:", basket)
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

  if (!selected.hasSizes) {
    // Update shoppingList
    const newItem = { ...selected }
    newItem.requestedSize = "";
    delete newItem.requestedSizes
    const updatedShoppingList = [ ...shoppingList, newItem];
    setShoppingList(updatedShoppingList)

    // Update basket
    const matchedIndex = updatedBasket.findIndex(item => item.title === selected.title)
    updatedBasket[matchedIndex].amountOrdered++;
    setBasket(updatedBasket);
    } else {
      console.log(selected, "hasSizes === true");
    }
    // setShoppingList(updatedShoppingList);
    // const index = updatedBasket.findIndex(
    //   (stockItem) => typeof stockItem[selected] === "number"
    // );
    // updatedBasket[index][selected]++;
    // setBasket(updatedBasket);
    // setIsHidden(true);
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
                  return (
                    <Fragment key={eachItem.title}>
                      <div className="basketItem">
                        <h2>{eachItem.title}</h2>
                        <div className="quantityAndPrice">
                          <div className="basketQuantity">
                            <button
                              aria-label={`Remove one ${eachItem.title} from basket`}
                              onClick={handleRemoveBasket}
                              value={JSON.stringify(eachItem)}
                            >
                              <IndeterminateCheckBoxIcon
                                className=""
                                sx={{
                                  width: 30,
                                  height: 30,
                                  fill: "rgba(250, 235, 215, 0.95)",
                                }}
                              />
                            </button>
                            <h2
                              aria-label={`Quantity of ${eachItem.title} in basket`}
                            >
                              {eachItem.amountOrdered}
                            </h2>
                            <button
                              aria-label={`Add another ${eachItem.title} to basket`}
                              onClick={handleAddBasket}
                              value={JSON.stringify(eachItem)}
                            >
                              <AddBoxIcon
                                sx={{
                                  width: 30,
                                  height: 30,
                                  fill: "rgba(250, 235, 215, 0.95)",
                                }}
                              />
                            </button>
                          </div>
                          <h2 className="itemCost">
                            £{eachItem.amountOrdered * eachItem.price}
                          </h2>
                        </div>
                      </div>
                    </Fragment>
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