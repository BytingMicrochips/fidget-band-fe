import Header from "./header.jsx";
import gigsData from "../../data/gigs-data.json";
import { useContext } from "react";
import { GigContext } from "../App.jsx"; 

const GigsGig_id = () => {
  const [GigSelected, setGigSelected] = useContext(GigContext);
  console.log("🚀 ~ file: page-gigs-gig_id.jsx:8 ~ GigSelected:", GigSelected)


    return (
      <>
        <Header />
        <h2> Gigs - Gig_id</h2>
      
      </>
    );
};

export default GigsGig_id;
