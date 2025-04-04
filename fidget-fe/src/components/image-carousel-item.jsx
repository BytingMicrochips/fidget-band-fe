import { Paper} from "@mui/material";
function CarouselItem(item) {
  { console.log(item) }
  return (
    <Paper sx={{ bgcolor: "transparent", boxShadow: "none"}}  >
      <img className="carouselImg" alt={item.description} src={item.source} width={"96%"} />
    </Paper>
  );
}

export default CarouselItem;

// <img alt={item.description} src={`./${item.source}`} />;
      
//  "/src/assets/mediaGallery/outCider.jpg";
