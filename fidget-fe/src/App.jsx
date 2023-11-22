import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { createContext, useContext, useState, useEffect } from "react";
import Splash from "./components/page-splash.jsx";
import Main from "./components/page-main.jsx";
import Gigs from "./components/page-gigs.jsx";
import GigsGig_id from "./components/page-gigs-gig_id.jsx";
import Gallery from "./components/page-gallery.jsx";
import Music from "./components/page-music.jsx";
import Store from "./components/page-store.jsx";
import StoreBasket from "./components/page-store-basket.jsx";
import shopStock from "../data/store-data.json";

export const BasketContext = createContext();
export const ShoppingListContext = createContext();

function App() {
  const [basket, setBasket] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
      const merchOrder = [];
      shopStock.map((eachItem) => {
        const merchItem = {};
        merchItem[eachItem.title] = 0;
        merchItem.price = eachItem.price;
        merchOrder.push(merchItem);
      });
      setBasket(merchOrder);
    }, []);
    
    console.log("🚀 ~ file: App.jsx:29 ~ useEffect ~ basket:", basket);
  return (
    <>
      <BrowserRouter>
        <BasketContext.Provider value={[basket, setBasket]}>
          <ShoppingListContext.Provider value={[shoppingList, setShoppingList]}>
            <Routes>
              <Route path="/" exact element={<Splash />} />
              <Route path="/home" exact element={<Main />} />
              <Route path="/gigs" exact element={<Gigs />} />
              <Route path="/gigs/:gig_id" exact element={<GigsGig_id />} />
              <Route path="/gallery" exact element={<Gallery />} />
              <Route path="/music" exact element={<Music />} />
              <Route path="/store" exact element={<Store />} />
              <Route path="/store/basket" exact element={<StoreBasket />} />
            </Routes>
            </ShoppingListContext.Provider>
        </BasketContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;