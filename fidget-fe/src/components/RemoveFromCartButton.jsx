import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const RemoveFromCartButton = ({ item, selected, handleRemoveBasket, handleHovering, isHovered }) => {
    
    return (
      <button
        onClick={handleRemoveBasket}
        value={JSON.stringify({
          title: item.title,
          hasSizes: item.hasSizes,
          requestedSize: selected,
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
            borderColor: isHovered ? "#0d0d0d" : "transparent",
            opacity: "90%",
          }}
        />
      </button>
    );
}

export default RemoveFromCartButton;