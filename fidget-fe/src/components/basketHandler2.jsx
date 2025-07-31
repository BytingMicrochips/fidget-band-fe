import ImageListItemBar from "@mui/material/ImageListItemBar";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton"
import RemoveFromCartButton from "./RemoveFromCartButton";

const BasketHandler = ({
  item,
  handleRemoveBasket,
  handleAddBasket,
  handleHovering,
  isHovered,
  basket,
  shopStock,
  selected,
}) => {
    const [furtherStock, setFurtherStock] = useState(false);
  const [sizeInBasket, setSizeInBasket] = useState(false);
  
  // const handleHovering = (bool) => {
  //   sendToStore(bool);
  // };

  useEffect(() => {
    const size = selected;
    let itemStock = shopStock.find((product) => product.title === item.title);
    let inBasket = basket.find((product) => product.title === item.title);

    if (item.hasSizes === false) {
      itemStock.stockAmount > inBasket.amountOrdered
        ? setFurtherStock(true)
        : setFurtherStock(false);
    } else {
      // Compare stock of selected size to number of same size already in basket
        if (
          itemStock.availableSizes[selected] >
          inBasket.requestedSizes.filter((size) => size === selected).length
        ){
          setFurtherStock(true);
        } else {
          setFurtherStock(false)
        }
      // Check if selected size is already in basket
      if (inBasket.requestedSizes.find((size) => size === selected)) {        
            setSizeInBasket(true)
        } else {
            setSizeInBasket(false)
        }
    }
  }, [item, selected]);

  return (
    <ImageListItemBar
      actionIcon={
        <>
          <div className="addRemoveBasket">
            {/* NOT HAS SIZES: Show remove cart when at least one of that item in basket*/}
            {item.hasSizes === false &&
              basket.find(
                (product) =>
                  product.title === item.title && product.amountOrdered > 0
              ) && (
                <RemoveFromCartButton
                  item={item}
                  handleRemoveBasket={handleRemoveBasket}
                  handleHovering={handleHovering}
                  isHovered={isHovered}
                />
              )}
            {item.hasSizes === true && sizeInBasket === true && (
              <RemoveFromCartButton
                item={item}
                handleRemoveBasket={handleRemoveBasket}
                handleHovering={handleHovering}
                isHovered={isHovered}
              />
            )}

            {/* Show add basket when item in stock */}
            {furtherStock && (
              <AddToCartButton
                item={item}
                selected={selected}
                handleAddBasket={handleAddBasket}
                handleHovering={handleHovering}
                isHovered={isHovered}
              />
            )}
          </div>
        </>
      }
    />
  );
};

export default BasketHandler;
