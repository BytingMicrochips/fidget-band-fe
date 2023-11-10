import "../App.css";
import Header from "./header.jsx";
import MailChimp from "../components/mailChimp";
import gigsData from "../../data/gigs-data.json";
import { useState } from "react";
                         
const Gigs = () => {
  const [isList, setIsList] = useState(true)
  
  const handleTileList = () => {
    isList === true ? setIsList(false) : setIsList(true)
    console.log(isList)
  }

  return (
    <>
      <Header />
          <h2> Upcoming shows</h2>
          <select defaultValue="Show tiles" onChange={handleTileList} className="tileOrList">
              <option>Show list</option>
              <option>Show tiles</option>
          </select>
          <div>
        {gigsData.map((gig) => {
                const gigDate = new Date(gig.date)
                return (
                  <>
                    {isList ? (
                      <>
                        <div className="buttonFlier">
                          <button className="gigButton">
                            <div id="gigTileDateLocation">
                              <h3>
                                {`${gigDate.getDate()}-${gigDate.getMonth()}-${gigDate.getFullYear()}`}
                              </h3>
                              <h3>{gig.location}</h3>
                            </div>
                            <h3>{gig.title}</h3>
                          </button>
                          <img src={gig.flier} width="98%" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="gigListItem">
                          <h3>{`${gigDate.getDate()}-${gigDate.getMonth()}-${gigDate.getFullYear()}`}</h3>
                          <h3>{gig.location}</h3>
                          <a href={gig.ticketLink}>Get tickets</a>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
      </div>
      <MailChimp/>
    </>
  );
};


export default Gigs;
