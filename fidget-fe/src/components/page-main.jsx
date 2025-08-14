import "../App.css";
import MailChimp from "../components/mailChimp";
import { useEffect, useState, useContext} from "react";
import DrawerNav from "./draw-nav.jsx";
import bandPic from "../assets/press shot edit.jpg";
import axios from "axios";
import { GigsContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./image-carousel.jsx";


const axiosBase = axios.create({
  baseURL: "https://fidget-band-be.onrender.com/api/",
});

const Main = () => {
  const [gigsData, setGigsData] = useContext(GigsContext);
  const [futureGigs, setFutureGigs] = useState([]);
  const [nextGig, setNextGig] = useState({});
  const [nextGigDate, setNextGigDate] = useState("");
  const drawerWidth = 150;
  const navigate = useNavigate();

  const actualDate = new Date();
  const dateNow = Math.ceil(actualDate / 100) * 100;

  useEffect ((
  ) => {
        axiosBase.get("gigs")
        .then(( allGigs ) => {
          setGigsData(allGigs.data);
      })
      .catch((err) => {
        console.error("Problem fetching gigs data", err);
      });
  }, [])

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
}, [gigsData])

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
      <div className="page-main" id="drawer">
        <DrawerNav className="drawerNav"/>
        <div className="bannerWrapper">
          {Object.keys(nextGig).length !== 0 ? (
            <>
              <div className="nextGigBanner">
                <a
                  onClick={() => {
                    navigate(`/gigs/${nextGig._id}`);
                  }}
                  draggable="false"
                >
                  Next playing in {nextGig.location} on {nextGigDate}!
                </a>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="carousel">
          <ImageCarousel />
        </div>
        <div className="blerb">
          <h2>
            We are a lively band offering brass-fuelled skapunkery, punchy beats
            & social absurdities! Dealing out generous helpings of itchy
            rhythyms, funk infused basslines and jazz drenched horn playing we
            have been active in the DIY scene since 2019.
          </h2>
        </div>
        <div className="reviews">
          <div id="reviewsAllText">
            <h3>
              "A playful assault of bouncy ska-punk, straight from Bristol's
              murky musical swamp" <br /> <em>Nibley Festival</em>
            </h3>
            <h3>
              "Relentlessly engaging and mischievous" <br />
              <em>The Ringmaster Review</em>
            </h3>
            <h3>
              "...it's a unique sound that has a bit of everything!"
              <br />
              <em>Rude Rebel</em>
            </h3>
            <h3>
              "Fun in a sinister kinda way" <br />
              <em>That's Good Enough For Me</em>
            </h3>
            <h3>
              "There is a captivating energy to the band, the music screams of
              danceability, it was pure party vibes..."
              <br />
              <em>Rockfreaks</em>
            </h3>
          </div>
        </div>
      </div>
      <div className="socialFeeds">
        <iframe
          id="facebookWidget"
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftwitchyfidgets&width=350&tabs=timeline&colorscheme=dark&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId_data-lazy=true"
          height="470"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          className="socialFeed"
        />
        <iframe
          id="instagramWidget"
          src="https://www.instagram.com/fidgetandthetwitchers/embed?theme=dark"
          height="470"
          allowtransparency="true"
          className="socialFeed"
        />
      </div>
      <MailChimp />
    </>
  );
}

export default Main;
