import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const BasketHandler = ({ item, handleRemoveBasket, handleAddBasket, sendToStore, isHovered }) => {
    
    const handleHovering = (bool) => {
        sendToStore(bool)       
    }

  return (
    <ImageListItemBar
      actionIcon={
        <>
          <div className="addRemoveBasket">
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
          </div>
        </>
      }
    />
  );
};

export default BasketHandler;
