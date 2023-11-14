import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import baritone from "../assets/mediaGallery/baritone.jpg";
import benDanny from "../assets/mediaGallery/benDanny.jpg";
import benDanny2 from "../assets/mediaGallery/benDanny2.jpg";
import benSheep from "../assets/mediaGallery/benSheep.jpg";
import brassGang from "../assets/mediaGallery/brassGang.jpg";
import chefGang from "../assets/mediaGallery/chefGang.jpg";
import convoyGang from "../assets/mediaGallery/convoyGang.jpg";
import dannyClown from "../assets/mediaGallery/dannyClown.jpg";
import dannyStripe from "../assets/mediaGallery/dannyStripe.jpg";
import hexBass from "../assets/mediaGallery/hexBass.jpg";
import hexCarpark from "../assets/mediaGallery/hexCarpark.jpg";
import hexMermaid from "../assets/mediaGallery/hexMermaid.jpg";
import hexNooch from "../assets/mediaGallery/hexNooch.jpg";
import nooch from "../assets/mediaGallery/nooch.jpg";
import noochJump from "../assets/mediaGallery/noochJump.jpg";
import oana from "../assets/mediaGallery/oana.jpg";
import oana2 from "../assets/mediaGallery/oana2.jpg";
import outCider from "../assets/mediaGallery/outCider.jpg";
import tom1 from "../assets/mediaGallery/tom1.jpg";
import tom2 from "../assets/mediaGallery/tom2.jpg";
import van from "../assets/mediaGallery/van.jpg";
import emilyMerch from "../assets/mediaGallery/emilyMerch.jpg";
import park from "../assets/mediaGallery/park.jpg";
import praccyRoom from "../assets/mediaGallery/praccyRoom.jpg";
import statue from "../assets/mediaGallery/statue.jpg";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: "96%" , height: 500, margin: "auto" }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: benDanny,
    title: "Ben and Danny",
    cols: 2,
  },
  {
    img: brassGang,
    title: "Horn section",
    cols: 2,
  },
  {
    img: chefGang,
    title: "Fidgets in the kitchen",
    rows: 2,
    cols: 3,
  },
  {
    img: hexBass,
    title: "Hex on bass for a change",
  },
  {
    img: dannyClown,
    title: "Danny taking life seriously",
  },
  {
    img: tom1,
    title: "Trumpet Tom in the zone",
    rows: 2,
    cols: 2,
  },
  {
    img: dannyStripe,
    title: "Danny Beetlejuice",
    rows: 3,
    cols: 2,
  },
  {
    img: oana,
    title: "Purple Oana",
    cols: 2,
  },
  {
    img: outCider,
    title: "Outcider festival crowd",
    cols: 4,
    rows: 2,
  },
  {
    img: baritone,
    title: "Jesse on the bari",
    rows: 2,
    cols: 2,
  },
  {
    img: benSheep,
    title: "Ben loves fancy dress!",
    cols: 2,
  },
  {
    img: hexCarpark,
    title: "Hex warming up",
    rows: 2,
    cols: 2,
  },
  {
    img: noochJump,
    title: "Flying sax!",
    cols: 2,
    rows: 2,
  },
  {
    img: hexNooch,
    title: "Keytar and sax on stage",
    cols: 2,
  },
  {
    img: oana2,
    title: "Oana at The Exchange, Bristol",
    rows: 2,
    cols: 3,
  },
  {
    img: hexMermaid,
    title: "Keytar playing mermaid",
    rows: 3,
  },
  {
    img: van,
    title: "New van photo",
    cols: 3,
    rows: 2,
  },
  {
    img: benDanny2,
    title: "Ben and Danny on stage",
  },
  {
    img: nooch,
    title: "Nooch playing fat solo",
    cols: 2,
  },
  {
    img: tom2,
    title: "Tom sending it",
    cols: 2,
  },
  {
    img: convoyGang,
    title: "Convoy Cabaret whole band",
    cols: 4,
    rows: 2,
  },
  {
    img: emilyMerch,
    title: "Manager Emily with the merch",
    cols: 2,
    rows: 2,
  },
  {
    img: praccyRoom,
    title: "Practice room",
    cols: 2,
    rows: 2,
  },
  {
    img: park,
    title: "Practice in the park",
    cols: 4,
    rows: 2,
  }
];
