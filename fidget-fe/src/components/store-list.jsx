import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useContext } from "react";
import { BasketContext, BasketUpdateContext } from "../App";
import  shopStock  from "../../data/store-data.json";
export default function StoreList() {
  const [basket, setBasket] = useContext(BasketContext);
  const [basketChanged, setBasketChanged] = useContext(BasketUpdateContext);

  const handleAddBasket = (e) => {
    if (basket.length > 0){
      const updatedBasket = basket
      updatedBasket.push(e.currentTarget.value);
      setBasket(updatedBasket)
      basketChanged? setBasketChanged(false) : setBasketChanged(true)
    } else {
      setBasket(
        [e.currentTarget.value],
        basketChanged ? setBasketChanged(false) : setBasketChanged(true)
      );
    }
  }

  const handleRemoveBasket = (e) => {
      const updatedBasket = basket.filter((eachItem)=> eachItem !== e.currentTarget.value)
      setBasket(updatedBasket)
      basketChanged? setBasketChanged(false) : setBasketChanged(true)
  }

  return (
    <ImageList sx={{ width: "96%", height: "60vh", margin: "auto" }}>
      {shopStock.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />

          {basket.includes(item.title) ? (
           
              <ImageListItemBar
                title={item.title}
                subtitle={`£${item.price}`}
                actionIcon={
                  <button
                    onClick={handleRemoveBasket}
                    value={item.title}
                    aria-label={`Remove ${item.title} from basket, price £${item.price}`}
                  >
                    <RemoveShoppingCartIcon
                      sx={{
                        color: "rgba(255, 255, 255, 0.54)",
                        opacity: "60%",
                      }}
                    />
                  </button>
                }
              />
           
          ) : (
            
              <ImageListItemBar
                title={item.title}
                subtitle={`£${item.price}`}
                actionIcon={
                  <button
                    onClick={handleAddBasket}
                    value={item.title}
                    aria-label={`Add ${item.title} to basket for £${item.price}`}
                  >
                    <AddShoppingCartIcon
                      sx={{
                        color: "rgba(255, 255, 255, 0.54)",
                        opacity: "95%",
                      }}
                    />
                  </button>
                }
              />
           
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
}