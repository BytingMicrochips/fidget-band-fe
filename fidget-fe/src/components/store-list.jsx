import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useContext, useState, useEffect } from "react";
import { BasketContext, ShoppingListContext } from "../App";
import axios from "axios";


const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});

export default function StoreList() {
  const [basket, setBasket] = useContext(BasketContext);
  const [isHidden, setIsHidden] = useState(true)
  const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
  const [shopStock, setShopStock] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

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
    const selected = e.currentTarget.value;
    const updatedBasket = [...basket]
    const updatedShoppingList = [e.currentTarget.value, ...shoppingList];
    setShoppingList(updatedShoppingList)
    const index = updatedBasket.findIndex((stockItem) => typeof stockItem[selected] === "number");
    updatedBasket[index][selected]++
    setBasket(updatedBasket)
    setIsHidden(true);
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

  const handleBasketOptions = () => {
    isHidden?setIsHidden(false):setIsHidden(true)
  }

  return (
    <ImageList
      sx={{
        width: "96%",
        height: "80vh",
        margin: "auto",
        borderRadius: "5px",
      }}
    >
      {shopStock.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
            onClick={handleBasketOptions}
            draggable="false"
            height="150px"
            borderRadius="5px"
          />
          {isHidden ? (
            <>
              <ImageListItemBar
                title={item.title}
                subtitle={`£${item.price}`}
              />
            </>
          ) : (
            <>
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
                              opacity: "90%",
                            }}
                          />
                        </button>
                      </div>
                    </>
                  }
                />
              ) : (
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
                          borderColor: "transparent",
                          opacity: "95%",
                          width: "100%",
                        }}
                      />
                    </button>
                  }
                />
              )}
            </>
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
}