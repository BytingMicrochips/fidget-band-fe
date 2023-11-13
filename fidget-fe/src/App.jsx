import "./App.css";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Splash from "./components/page-splash.jsx";
import Main from "./components/page-main.jsx";
import Gigs from "./components/page-gigs.jsx";
import GigsGig_id from "./components/page-gigs-gig_id.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Splash/>}/>
          <Route path="/home" exact element={<Main/>}/>
          <Route path="/gigs" exact element={<Gigs/>}/>
          <Route path="/gigs/:gig_id" exact element={<GigsGig_id />}/>
        </Routes>    
      </BrowserRouter>
    </>
  );
}

export default App;