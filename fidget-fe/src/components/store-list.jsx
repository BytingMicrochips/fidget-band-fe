import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useContext, useState, useEffect } from "react";
import { BasketContext, ShoppingListContext } from "../App";
import axios from "axios";
import SizeSelector from "./sizeSelector";
import Box from "@mui/material/Box";


const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});

export default function StoreList() {
  const [basket, setBasket] = useContext(BasketContext);
  console.log("🚀 ~ StoreList ~ basket:", basket)
  const [isHidden, setIsHidden] = useState(true)
  const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
  console.log("🚀 ~ StoreList ~ shoppingList:", shoppingList)
  const [shopStock, setShopStock] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isViewing, setIsViewing] = useState("");

  useEffect ((
  ) => {
    //remove later
    // setBasket([])
        axiosBase.get("store")
        .then(( allStock ) => {
        setShopStock(allStock.data);
      })
      .catch((err) => {
        console.error("Problem fetching stock data", err);
      });
  }, [])

  const handleAddBasket = (e) => {
    // set name of purchase item to variable "selected"
    const selected = e.currentTarget.value;
    // copy current basket into new updatedBasket variable
    const updatedBasket = [...basket]
    // add selected purchase item to updatedShoppingList
    const updatedShoppingList = [e.currentTarget.value, ...shoppingList];
    // update shoppingList state
    setShoppingList(updatedShoppingList)
    const index = updatedBasket.findIndex((stockItem) => typeof stockItem[selected] === "number");
    updatedBasket[index][selected]++
    setBasket(updatedBasket)
    // setIsHidden(true);
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
    isViewing === selected ? setIsViewing("") : setIsViewing(selected);
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
          {/* IS THE ITEM NOT isViewing?*/}
          {isViewing != item._id ? (
            <>
              <ImageListItemBar
                title={item.title}
                subtitle={`£${item.price}`}
                sx={{
                  borderRadius: "5px",
                  height: "50px",
                  backgroundColor: "rgba(13,13,13,0.65)",
                }}
              />
            </>
          ) : (
            <>
              {/* IS THE ITEM ALREADY IN BASKET ? */}
              {shoppingList.includes(item.title) ? (
                <ImageListItemBar
                  actionIcon={
                    <>
                      <div className="addRemoveBasket">
                        <button
                          onClick={handleRemoveBasket}
                          value={item.title}
                          aria-label={`Remove ${item.title} from basket, price £${item.price}`}
                          onMouseEnter={() => {
                            setIsHovered(true);
                          }}
                          onMouseLeave={() => {
                            setIsHovered(false);
                          }}
                          sx={{
                            color: isHovered,
                            borderRadius: "5px"
                              ? "#0d0d0d"
                              : "rgba(209, 92, 42, 0.95)",
                            height: "50px",
                            opacity: "90%",
                          }}
                        >
                          <RemoveShoppingCartIcon
                            sx={{
                              color: isHovered
                                ? "#0d0d0d"
                                : "rgba(209, 92, 42, 0.95)",
                              opacity: "90%",
                            }}
                          />
                        </button>
                        <button
                          onClick={handleAddBasket}
                          value={item.title}
                          aria-label={`Add ${item.title} to basket for £${item.price}`}
                          onMouseEnter={() => {
                            setIsHovered(true);
                          }}
                          onMouseLeave={() => {
                            setIsHovered(false);
                          }}
                        >
                          <AddShoppingCartIcon
                            sx={{
                              color: isHovered
                                ? "#0d0d0d"
                                : "rgba(209, 92, 42, 0.95)",
                              borderColor: isHovered
                                ? "#0d0d0d"
                                : "transparent",
                              opacity: "90%",
                            }}
                          />
                        </button>
                      </div>
                    </>
                  }
                />
              ) : // ITEM IS NOT ALREADY IN BASKET && HAS SIZES
              item.hasSizes && item.stockAmount != 0 ? (
                <>
                  <Box
                    sx={{
                      maxHeight: 170,
                      overflowY: "visible",
                      position: "top",
                    }}
                  >
                    <div>
                      <ImageListItemBar
                        title={item.title}
                        subtitle={`£${item.price}`}
                        sx={{
                          borderRadius: "5px",
                          height: "50px",
                          backgroundColor: "rgba(13,13,13,0.65)",
                        }}
                      />
                      <SizeSelector
                        item={item}
                        className="sizeAndPrice"
                        sx={{ zIndex: 1000 }}
                      />
                    </div>
                  </Box>
                </>
              ) : (
                <>
                  <ImageListItemBar
                    actionIcon={
                      <button
                        onClick={handleAddBasket}
                        value={item.title}
                        aria-label={`Add ${item.title} to basket for £${item.price}`}
                        onMouseEnter={() => {
                          setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                          setIsHovered(false);
                        }}
                      >
                        <AddShoppingCartIcon
                          sx={{
                            color: isHovered
                              ? "#0d0d0d"
                              : "rgba(209, 92, 42, 0.8)",
                            opacity: "90%",
                            width: "100%",
                          }}
                        />
                      </button>
                    }
                    sx={{
                      borderRadius: "5px",
                      height: "50px",
                      backgroundColor: "rgba(13,13,13,0.65)",
                    }}
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