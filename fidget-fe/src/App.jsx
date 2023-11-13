import "./App.css";
import Splash from "./components/page-splash.jsx";
import Main from "./components/page-main.jsx";
import Gigs from "./components/page-gigs.jsx";
import GigsGig_id from "./components/page-gigs-gig_id.jsx";
import { useContext, createContext, useState } from "react";

export const GigContext = createContext();

function App() {
  const [GigSelected, setGigSelected] = useState({})
  return (
    <>
      <GigContext.Provider value={[GigSelected, setGigSelected]}>
        {/* <Splash />  */}
        {/* <Main/>  */}
        {/* <Gigs /> */}
         <GigsGig_id /> 
      </GigContext.Provider>
    </>
  );
}

export default App;
