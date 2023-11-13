import "./App.css";
import DrawerNav from "./components/draw-nav.jsx";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Splash from "./components/page-splash.jsx";
import Main from "./components/page-main.jsx";
import Gigs from "./components/page-gigs.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Splash/>}/>
          <Route path="/home" exact element={<Main/>}/>
          <Route path="/gigs" exact element={<Gigs/>}/>
          {/* <Splash />  */}
          {/* <Main/> */}
          {/* <Gigs />  */}
          {/* <DrawerNav /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
