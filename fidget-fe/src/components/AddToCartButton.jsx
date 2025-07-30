import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";

const AddToCartButton = ({ item, selected, handleAddBasket }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleHovering = (bool) => {
    setIsHovered(bool);
  };

  return (
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
  );
};

export default AddToCartButton;
