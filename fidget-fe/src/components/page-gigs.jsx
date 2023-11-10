import "../App.css";
import Header from "./header.jsx";
import MailChimp from "../components/mailChimp";
import gigsData from "../../data/gigs-data.json";
import { useState } from "react";
                         
const Gigs = () => {
    const [isList, setIsList] = useState(true)
  return (
    <>
      <Header />
          <h2> Upcoming shows</h2>
          <select defaultValue="Show tiles">
              <option>Show list</option>
              <option>Show tiles</option>
          </select>
          <div>
              {gigsData.map((gig) => {
                  return (
                    <>
                      <div className="buttonFlier">
                        <button className="gigButton">
                          <h3>
                            {gig.date} {gig.location}
                          </h3>
                          <h3>{gig.title}</h3>
                              </button>
                              <img src={gig.flier} width="98%"/>
                      </div>
                    </>
                  );
              })}
      </div>
      <MailChimp/>
    </>
  );
};


export default Gigs;
