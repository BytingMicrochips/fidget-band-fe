import ImageListItemBar from "@mui/material/ImageListItemBar";

const StorePriceCard = ( {title, price} ) => {
  return (
    <>
      <ImageListItemBar
        title={title}
        subtitle={`£${price}`}
        sx={{
          borderRadius: "5px",
          height: "54px",
          backgroundColor: "rgba(13,13,13,0.65)",
        }}
      />
    </>
  );
};

export default StorePriceCard;
