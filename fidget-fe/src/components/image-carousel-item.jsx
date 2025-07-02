import { Paper} from "@mui/material";
function CarouselItem(item) {
  return (
    <Paper sx={{ bgcolor: "transparent", boxShadow: "none"}}  >
      <img className="carouselImg" alt={item.description} src={item.source} width={"100%"} />
    </Paper>
  );
}

export default CarouselItem;