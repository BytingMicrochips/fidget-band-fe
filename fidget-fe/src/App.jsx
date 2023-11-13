import "./App.css";
import DrawerNav from "./components/draw-nav.jsx";
import {Routes, Route, BrowserRouter} from "react-router-dom"
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
      <BrowserRouter>
          <GigContext.Provider value={[GigSelected, setGigSelected]}>
        <Routes>
          <Route path="/" exact element={<Splash/>}/>
          <Route path="/home" exact element={<Main/>}/>
          <Route path="/gigs" exact element={<Gigs/>}/>
          <Route path="/gigs/:gig_id" exact element={<GigsGig_id />}/>
        </Routes>
          </GigContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;