import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useEffect, useState } from "react";

const BasketHandler = ({ item, handleRemoveBasket, handleAddBasket, sendToStore, isHovered, basket, shopStock }) => {
    const [furtherStock, setFurtherStock] = useState(false);
    const handleHovering = (bool) => {
        sendToStore(bool)       
    }

    useEffect(() => {
        let itemStock = shopStock.find((product) => product.title === item.title);
        let inBasket = basket.find((product) => product.title === item.title);
        itemStock.stockAmount > inBasket.amountOrdered ? setFurtherStock(true) : setFurtherStock(false);
    },[item])

  return (
    <ImageListItemBar
      actionIcon={
        <>
                  <div className="addRemoveBasket">
                      
            {/* ONLY RENDER REMOVE BASKET ICON IF ITEM IS IN BASKET */}
            {basket.find(
              (product) =>
                product.title === item.title && product.amountOrdered > 0
            ) && (
              <button
                onClick={handleRemoveBasket}
                value={JSON.stringify({
                  title: item.title,
                  hasSizes: false,
                  requestedSize: "",
                  price: item.price,
                })}
                aria-label={`Remove ${item.title} from basket, price £${item.price}`}
                onMouseEnter={() => {
                  handleHovering(true);
                }}
                onMouseLeave={() => {
                  handleHovering(false);
                }}
                sx={{
                  color: isHovered,
                  borderRadius: "5px" ? "#0d0d0d" : "rgba(209, 92, 42, 0.95)",
                  height: "50px",
                  opacity: "90%",
                }}
              >
                <RemoveShoppingCartIcon
                  sx={{
                    color: isHovered ? "#0d0d0d" : "rgba(209, 92, 42, 0.95)",
                    opacity: "90%",
                  }}
                />
              </button>
                          )}
                      
            {/* ONLY RENDER ADD BASKET ICON IF STOCK REMAINING > AMOUNT IN BASKET */}
                      {furtherStock &&
                          <button
                              onClick={handleAddBasket}
                              value={JSON.stringify({
                                  title: item.title,
                                  hasSizes: false,
                                  requestedSize: "",
                                  price: item.price,
                              })}
                              aria-label={`Add ${item.title} to basket for £${item.price}`}
                              onMouseEnter={() => {
                                  handleHovering(true);
                              }}
                              onMouseLeave={() => {
                                  handleHovering(false);
                              }}
                          >
                              <AddShoppingCartIcon
                                  sx={{
                                      color: isHovered ? "#0d0d0d" : "rgba(209, 92, 42, 0.95)",
                                      borderColor: isHovered ? "#0d0d0d" : "transparent",
                                      opacity: "90%",
                                  }}
                              />
                          </button>
                      }
          </div>
        </>
      }
    />
  );
};

export default BasketHandler;
