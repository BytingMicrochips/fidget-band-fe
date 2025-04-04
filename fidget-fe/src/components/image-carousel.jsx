import * as React from "react";
import Carousel from "react-material-ui-carousel";
import van from "../assets/mediaGallery/van.jpg";
import outcider from "../assets/mediaGallery/outCider.jpg"
import CarouselItem from "./image-carousel-item";
import bandPic from "../assets/press shot edit.jpg";


const ImageCarousel = () => {

  const carouselContents = [
    {
      _id: 1,
      name: "Band image",
      description: "All members of the band",
      source: bandPic,
    },
    {
      _id: 2,
      name: "Van image",
      description: "the band with their van",
      source: van,
    },
    {
      _id: 3,
      name: "Outcide image",
      description: "the band playing outcider festival",
      source: outcider,
    },
  ];



  return (
    <div className="carousel">
    <Carousel
      autoPlay="true"
      interval={10000}
      animation="fade"
      duration={2300}
      indicators="false"
      stopAutoPlayOnHover="false"
      >
      {
        carouselContents.map(item => <CarouselItem key={item._id} source={item.source} />)
      }
    </Carousel>
      </div>
    );
}


export default ImageCarousel;

