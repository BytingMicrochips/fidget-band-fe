import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import QuiltedImageList from "./image-list.jsx";

const Gallery = () => {
  const drawerWidth = 240;

    return (
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            padding: 0,
          }}
        >
          <DrawerNav />
          <h2> Media gallery</h2>
          <QuiltedImageList />
          <div className="galleryVids">
            <iframe
              width="96%"
              height="315"
              src="https://www.youtube.com/embed/hrAa_g3bKS4?si=2d03mTFVp43TZlsJ"
              title="Allergic to Brass Boomtown (Youtube)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
            <iframe
              width="96%"
              height="315"
              src="https://www.youtube.com/embed/ac-290Sxpb8?si=eskc4n5JkA2m_CIs"
              title="Living with Leeches live at Balter Festival 2023"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
            <iframe
              width="96%"
              height="315"
              src="https://www.youtube.com/embed/PC_xW9nB1mM?si=GWa1DVyHlMDdudWe"
              title="Manchester Punk Festival 2023 Interview and Live clips"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            />
          </div>
        </Box>
      </>
    );
}

export default Gallery;