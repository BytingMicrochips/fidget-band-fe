import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useEffect, useState } from "react";

const BasketHandler = ({
  item,
  handleRemoveBasket,
  handleAddBasket,
  sendToStore,
  isHovered,
  basket,
  shopStock,
  selected,
}) => {
    const [furtherStock, setFurtherStock] = useState(false);
    const [sizeInBasket, setSizeInBasket] = useState(false);
  const handleHovering = (bool) => {
    sendToStore(bool);
  };

  useEffect(() => {
    const size = selected;
    let itemStock = shopStock.find((product) => product.title === item.title);
    let inBasket = basket.find((product) => product.title === item.title);
    console.log("🚀 ~ useEffect ~ basket:", basket)

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
        if (inBasket.requestedSizes.filter((size) => size === selected)) {
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
                <button
                  onClick={handleRemoveBasket}
                  value={JSON.stringify({
                    title: item.title,
                    hasSizes: item.hasSizes,
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
            {item.hasSizes === true && sizeInBasket === true &&
                      (
                    <button
                      onClick={handleRemoveBasket}
                      value={JSON.stringify({
                        title: item.title,
                        hasSizes: item.hasSizes,
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
                  )}
              
            {/* Show add basket when item in stock */}
            {furtherStock && (
              <button
                onClick={handleAddBasket}
                value={JSON.stringify({
                  title: item.title,
                  hasSizes: item.hasSizes,
                  requestedSize: selected,
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
            )}
          </div>
        </>
      }
    />
  );
};

export default BasketHandler;
