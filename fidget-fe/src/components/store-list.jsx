import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useContext, useState, useEffect } from "react";
import { BasketContext, ShoppingListContext } from "../App";
import axios from "axios";
import SizeSelector from "./sizeSelector";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import StorePriceCard from "./storePriceCard";
import BasketHandler from "./basketHandler";

const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});

export default function StoreList() {
  const [basket, setBasket] = useContext(BasketContext);
  const [isHidden, setIsHidden] = useState(true)
  const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
  const [shopStock, setShopStock] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isViewing, setIsViewing] = useState("");
  const [selected, setSelected] = useState("")
  // console.log("🚀 ~ StoreList ~ isHovered:", isHovered)
  // console.log("🚀 ~ StoreList ~ isViewing:", isViewing)
  console.log("🚀 ~ StoreList ~ selected:", selected)
  // console.log("🚀 ~ StoreList ~ shoppingList:", shoppingList)
  // console.log("🚀 ~ StoreList ~ basket:", basket)
  useEffect ((
  ) => {
        axiosBase.get("store")
        .then(( allStock ) => {
        setShopStock(allStock.data);
      })
      .catch((err) => {
        console.error("Problem fetching stock data", err);
      });
  }, [])

  const handleAddBasket = (e) => {
    // parse json object passed as value
    let newItem = JSON.parse(e.currentTarget.value);

    console.log("🚀 ~ handleAddBasket ~ newItem:", newItem);

    // copy current basket into new updatedBasket variable
    const updatedBasket = [...basket];

    // add new purchase item to updatedShoppingList
    const updatedShoppingList = [newItem, ...shoppingList];

    // update shoppingList state
    setShoppingList(updatedShoppingList);

    // set name of new purchase item to variable "selected"
    // const selected = newItem.title;

    // find new purchase item in basketDTO and increment order
    const indexToUpdate = updatedBasket.findIndex(
      (item) => item.title === newItem.title
    );
    updatedBasket[indexToUpdate].amountOrdered++;

    // if hasSized then push fromSelector to requestedSizes array
    newItem.hasSizes &&
      updatedBasket[indexToUpdate].requestedSizes.push(newItem.requestedSize);

    // set states for basket and to return store to default view
    setBasket(updatedBasket);
    setIsViewing("");
    setSelected("");
  }

  const handleRemoveBasket = (e) => {
    const selected = e.currentTarget.value;
    const updatedBasket = [...basket];
    const indexToRemove = shoppingList.indexOf(selected)
    const updatedShoppingList = []
    for (let i = 0; i < shoppingList.length; i++){
      if (i !== indexToRemove) {
        updatedShoppingList.push(shoppingList[i])
      }
    }
    setShoppingList(updatedShoppingList)
    const index = updatedBasket.findIndex((stockItem) => typeof stockItem[selected] === "number");
    if (updatedBasket[index][selected] > 0) {
      updatedBasket[index][selected]-- 
      setBasket(updatedBasket);
    }
    setIsHidden(true);
  }

  const handleBasketOptions = (e) => {
    const selected = e.target.getAttribute("product");
    isViewing === selected ? setIsViewing("") : setIsViewing(selected), setSelected("");
  }

  return (
    <ImageList
      sx={{
        width: "96%",
        height: "80vh",
        margin: "auto",
      }}
    >
      {shopStock.map((item) => (
        <ImageListItem key={item.img} className="shopItemCard">
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            onClick={handleBasketOptions}
            product={item._id}
            draggable="false"
          />
          {isViewing != item._id ? (
            // ITEM NOT BEING VIEWED
            <StorePriceCard title={item.title} price={item.price} />
          ) : (
            <>
              {/* ITEM IS BEING VIEWED */}
              {shoppingList.find(
                (listItem) => listItem.title === item.title
              ) ? (
                // ITEM IS ON SHOPPING LIST
                <BasketHandler
                  item={item}
                  handleRemoveBasket={handleRemoveBasket}
                  handleAddBasket={handleAddBasket}
                  isHovered={isHovered}
                  basket={basket}
                  shopStock={shopStock}
                  selected={selected}
                />
              ) : // ITEM NOT ON SHOPPING LIST
              // ITEM HAS SIZES && IS IN STOCK
              item.hasSizes && item.stockAmount != 0 ? (
                <>
                  <Box
                    sx={{
                      maxHeight: 170,
                      overflowY: "visible",
                      position: "top",
                    }}
                  >
                    {selected.length === 0 && (
                      <StorePriceCard title={item.title} price={item.price} />
                    )}
                    {isViewing === item._id && (
                      <SizeSelector
                        item={item}
                        className="sizeAndPrice"
                        sx={{ zIndex: 1000 }}
                        setSelected={setSelected}
                      />
                    )}
                    {selected.length != 0 && isViewing === item._id && (
                      <BasketHandler
                                    item={item}
                                    handleRemoveBasket={handleRemoveBasket}
                                    handleAddBasket={handleAddBasket}
                                    isHovered={isHovered}
                                    basket={basket}
                                    shopStock={shopStock}
                                    selected={selected}
                      />
                    )}
                    {
                      //       selected.length != 0 ? (
                      //   <>
                      //     <ImageListItemBar
                      //       actionIcon={
                      //         <>
                      //             <BasketHandler
                      //               item={item}
                      //               handleRemoveBasket={handleRemoveBasket}
                      //               handleAddBasket={handleAddBasket}
                      //               isHovered={isHovered}
                      //               basket={basket}
                      //               shopStock={shopStock}
                      //               selected={selected}
                      //             />
                      //         </>
                      //       }
                      //     />
                      //     {/* SIZE SELECTION NOTMADE */}
                      //     <SizeSelector
                      //       item={item}
                      //       className="sizeAndPrice"
                      //       sx={{ zIndex: 1000 }}
                      //       setSelected={setSelected}
                      //     />
                      //   </>
                      // ) : (
                      //   // SIZE SELECTION IS NOT MADE
                      //   <Fragment>
                      //     <StorePriceCard title={item.title} price={item.price} />
                      //     <SizeSelector
                      //       item={item}
                      //       className="sizeAndPrice"
                      //       sx={{ zIndex: 1000 }}
                      //       setSelected={setSelected}
                      //     />
                      //   </Fragment>
                      //       )
                    }
                  </Box>
                </>
              ) : (
                // ITEM DOESNT HAVE SIZES && IS IN STOCK
                <>
                  <BasketHandler
                    item={item}
                    handleRemoveBasket={handleRemoveBasket}
                    handleAddBasket={handleAddBasket}
                    isHovered={isHovered}
                    basket={basket}
                    shopStock={shopStock}
                    selected={selected}
                  />
                </>
              )}
            </>
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
}