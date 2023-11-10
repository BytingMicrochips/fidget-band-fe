import "../App.css";
import Header from "./header.jsx";
import MailChimp from "../components/mailChimp";
import { useEffect, useState, } from "react";
import gigsData from "../../data/gigs-data.json";

const Main = () => {
  const [futureGigs, setFutureGigs] = useState([]);
  const [nextGig, setNextGig] = useState({});
  const [nextGigDate, setNextGigDate] = useState("");

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
      <div className="page-main">
        <Header />
        <h2>
          Brass-fuelled skapunkery spurting punchy beats & social absurdities!
          Dealing out generous helpings of itchy rhythyms, funk infused
          basslines and jazz drenched horn lines we have been active in the diy
          seen since 2019.
        </h2>
        <div className="nextGigBanner">
          <h3>
            Next playing in {nextGig.location} on {nextGigDate} !
          </h3>
          <a href={nextGig.ticketLink}>Buy tickets</a>
        </div>
      </div>
      <div className="socialFeeds">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftwitchyfidgets&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="340"
          height="500"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          data-skin="dark"
          className="socialFeed"
        />
        <iframe
          src="https://www.instagram.com/fidgetandthetwitchers/embed"
          width="340"
          height="340"
          scrolling="no"
          allowtransparency="true"
          data-skin="dark"
          className="socialFeed"
        />
      </div>
      <MailChimp/>
    </>
  );
}

export default Main;
