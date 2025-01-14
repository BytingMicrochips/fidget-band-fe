import "../App.css";
import Header from "./header.jsx";
import MailChimp from "../components/mailChimp";
import { useEffect, useState, } from "react";
import gigsData from "../../data/gigs-data.json";
import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import contraband from "../assets/contrabandCircusBanner.jpg";
import bandPic from "../assets/bandGaryHorne.jpg";

const Main = () => {
  const [futureGigs, setFutureGigs] = useState([]);
  const [nextGig, setNextGig] = useState({});
  const [nextGigDate, setNextGigDate] = useState("");
  const drawerWidth = 150;

  const actualDate = new Date();
  const dateNow = Math.ceil(actualDate / 100) * 100;

  useEffect(() => {
    const timeFromNow = gigsData.map((eachGig) => {
      return new Date(eachGig.date) - dateNow;
    });

    const upcomingGigs = timeFromNow.filter((eachGig) => {
      if (eachGig >= 0) {
        return eachGig;
      }
    });

    setFutureGigs(
      upcomingGigs.sort(function (a, b) {
        return a - b;
      })
    );
  }, []);

  useEffect(() => {
    gigsData.filter((eachGig) => {
      if (
        new Date(eachGig.date) - dateNow ===
        futureGigs[0]
      ) {
        setNextGig(eachGig);
      }
    });
  }, [futureGigs]);
  
  useEffect(() => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const suffix = ["st","nd","rd","th","th","th","th","th","th","th", "th","th","th","th","th","th","th","th","th","th", "st","nd","rd","th","th","th","th","th","th","th", "st"]
    const fullDate = new Date(nextGig.date);

    setNextGigDate(
      `${days[fullDate.getDay()]} ${fullDate.getDate()}${suffix[fullDate.getDate()-1]
      } ${months[fullDate.getMonth()]} ${fullDate.getFullYear()}`
    );
  }, [nextGig]);
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
        <div className="page-main">
          <DrawerNav />
          <img
            src={contraband}
            alt="Contraband Circus new single 10-11-23 banner"
            className="contrabandBanner"
          />
          {Object.keys(nextGig).length !== 0 ? (
            <>
              <div className="nextGigBanner">
                <h3>
                  Next playing in {nextGig.location} on {nextGigDate} !
                </h3>
                <a href={nextGig.ticketLink}>Buy tickets</a>
              </div>
            </>
          ) : (
            <></>
          )}
          <img
            src={bandPic}
            alt="full band after a busy gig"
            className="pageMainBandPic"
          />
          <h2>
            Brass-fuelled skapunkery spurting punchy beats & social absurdities!
            Dealing out generous helpings of itchy rhythyms, funk infused
            basslines and jazz drenched horn lines we have been active in the
            diy seen since 2019.
          </h2>
        </div>
        <div className="socialFeeds">
          <iframe
            id="facebookWidget"
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftwitchyfidgets&tabs=timeline&colorscheme=dark&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId_data-lazy=true"
            height="380"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className="socialFeed"
          />
          <iframe
            id="instagramWidget"
            src="https://www.instagram.com/fidgetandthetwitchers/embed?theme=dark"
            height="380"
            allowtransparency="true"
            className="socialFeed"
          />
        </div>
        <MailChimp />
      </Box>
    </>
  );
}

export default Main;
