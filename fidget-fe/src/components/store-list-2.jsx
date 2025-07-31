import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useContext, useState, useEffect } from "react";
import { BasketContext, ShoppingListContext } from "../App";
import axios from "axios";
import SizeSelector from "./sizeSelector";
import StorePriceCard from "./storePriceCard";
import BasketHandler from "./basketHandler2.jsx";

const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});

const StoreList2 = () => {
  const [basket, setBasket] = useContext(BasketContext);
  const [shoppingList, setShoppingList] = useContext(ShoppingListContext);
  console.log("🚀 ~ StoreList2 ~ shoppingList:", shoppingList)
  const [shopStock, setShopStock] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isViewing, setIsViewing] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axiosBase
      .get("store")
      .then((allStock) => {
        setShopStock(allStock.data);
      })
      .catch((err) => {
        console.error("Problem fetching stock data", err);
      });
  }, []);

  const handleAddBasket = (e) => {
    // parse json object passed as value
    let newItem = JSON.parse(e.currentTarget.value);

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
    setIsHovered(false);
  };

    const handleRemoveBasket = (e) => {
    let selected = JSON.parse(e.currentTarget.value);
    console.log(
      "🚀 ~ handleRemoveBasket ~ selected.requestedSize:",
      selected.requestedSize
    );

      // copy basket
      const updatedBasket = [...basket];

      // copy shopping list
        const updatedShoppingList = [...shoppingList];
        
      // find item index in basket
      const indexBasket = updatedBasket.findIndex(
        (product) => product.title === selected.title
      );

      // find item index in shopping list
      const indexShoppingList = updatedShoppingList.findIndex(
        (product) => product.title === selected.title
      );

      // modify amountOrdered of item if item does NOT have sizes
      if (selected.hasSizes === false) {
        updatedBasket[indexBasket].amountOrdered >= 1
          ? updatedBasket[indexBasket].amountOrdered--
          : false;
        updatedShoppingList.splice([indexShoppingList], 1);
      } else {
      // modify amountOrdered of item and requestedSizes if item DOES have sizes
        const sizeIndex = updatedBasket[indexBasket].requestedSizes.findIndex(
          (size) => size === selected.requestedSize
        );
        if (sizeIndex != -1) {
          updatedBasket[indexBasket].requestedSizes.splice(sizeIndex, 1);
          updatedBasket[indexBasket].amountOrdered--;

        }
      // remove item of specified size from shoppingList
          const indexSizeInList = updatedShoppingList.findIndex((product) => {
              return ( product.requestedSize === selected.requestedSize)
          })
        updatedShoppingList.splice([indexSizeInList], 1);
      }

      // set changes in state and return store to default view
      setBasket(updatedBasket);
      setShoppingList(updatedShoppingList);
      setIsViewing("");
      setIsHovered(false);

      // const indexToRemove = shoppingList.indexOf(selected);
      // const updatedShoppingList = [];
      // for (let i = 0; i < shoppingList.length; i++) {
      //   if (i !== indexToRemove) {
      //     updatedShoppingList.push(shoppingList[i]);
      //   }
      // }
      // setShoppingList(updatedShoppingList);
      // const index = updatedBasket.findIndex(
      //   (stockItem) => typeof stockItem[selected] === "number"
      // );
      // if (updatedBasket[index][selected] > 0) {
      //   updatedBasket[index][selected]--;
      //   setBasket(updatedBasket);
      // }
      // setIsHidden(true);
    };

  const handleBasketOptions = (e) => {
    const selected = e.target.getAttribute("product");
    isViewing === selected ? setIsViewing("") : setIsViewing(selected),
      setSelected("");
  };
    
  const handleHovering = (bool) => {
    setIsHovered(bool);
  };

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
          {isViewing != item._id && (
            <StorePriceCard title={item.title} price={item.price} />
          )}
          {isViewing === item._id && item.hasSizes === false && (
            <BasketHandler
              item={item}
              handleRemoveBasket={handleRemoveBasket}
              handleAddBasket={handleAddBasket}
              handleHovering={handleHovering}
              isHovered={isHovered}
              basket={basket}
              shopStock={shopStock}
              selected={selected}
            />
          )}
          {isViewing === item._id &&
            item.hasSizes === true &&
            selected.length === 0 && (
              <>
                <SizeSelector
                  className="sizeAndPrice"
                  item={item}
                  setSelected={setSelected}
                  selected={selected}
                  sx={{ zIndex: 1000 }}
                />
                <StorePriceCard title={item.title} price={item.price} />
              </>
            )}
          {isViewing === item._id &&
            item.hasSizes === true &&
            selected.length != 0 && (
              <>
                <SizeSelector
                  className="sizeAndPrice"
                  item={item}
                  setSelected={setSelected}
                  selected={selected}
                  sx={{ zIndex: 1000 }}
                />
                <BasketHandler
                  item={item}
                  handleRemoveBasket={handleRemoveBasket}
                  handleAddBasket={handleAddBasket}
                  handleHovering={handleHovering}
                  isHovered={isHovered}
                  basket={basket}
                  shopStock={shopStock}
                  selected={selected}
                />
              </>
            )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default StoreList2;