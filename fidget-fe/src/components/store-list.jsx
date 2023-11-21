import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useContext } from "react";
import { BasketContext, BasketUpdateContext } from "../App";

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
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const shopStock = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    price: 10,
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    price: 5,
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    price: 20,
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    price: 15,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    price: 10,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    price: 10,
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    price: 20,
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    price: 15,
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    price: 5,
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    price: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    price: 10,
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    price: 15,

    cols: 2,
  },
];
