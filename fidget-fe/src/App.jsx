import "./App.css";
import { Routes, Route, BrowserRouter, json } from "react-router-dom"
import { createContext, useContext, useState, useEffect } from "react";
import Splash from "./components/page-splash.jsx";
import Main from "./components/page-main.jsx";
import Gigs from "./components/page-gigs.jsx";
import GigsGig_id from "./components/page-gigs-gig_id.jsx";
import Gallery from "./components/page-gallery.jsx";
import Store from "./components/page-store.jsx";
import StoreBasket from "./components/page-store-basket.jsx";
import Checkout from "./components/page-store-checkout.jsx";
import Contact from "./components/page-contact.jsx";
import basketDTO from "../data/basket-DTO.json";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export const BasketContext = createContext();
export const ShoppingListContext = createContext();
export const GigsContext = createContext();

function App() {
  const [basket, setBasket] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [gigsData, setGigsData] = useState([]);

    useEffect(() => {
      // const merchOrder = [];
      // shopStock.map((eachItem) => {
      //   const merchItem = {};
      //   merchItem[eachItem.title] = 0;
      //   merchItem.price = eachItem.price;
      //   merchOrder.push(merchItem);
      // });
      // setBasket(merchOrder);
      setBasket(basketDTO)
    }, []);
    
  return (
    <>
      <BrowserRouter>
        <BasketContext.Provider value={[basket, setBasket]}>
          <ShoppingListContext.Provider value={[shoppingList, setShoppingList]}>
            <GigsContext.Provider value={[gigsData, setGigsData]}>
              <PayPalScriptProvider
                options={{
                  clientId:
                    "AZO-gIkUY52-hUMGqCJggP3Hd0T1vvHtN85YBOyFMP7MuN4cc4s_Tw7vH2czYrI-PaNneoZhCOvnE81b",
                }}
              >
                <Routes>
                  <Route path="/" exact element={<Splash />} />
                  <Route path="/home" exact element={<Main />} />
                  <Route path="/gigs" exact element={<Gigs />} />
                  <Route path="/gigs/:_id" exact element={<GigsGig_id />} />
                  <Route path="/musicandgallery" exact element={<Gallery />} />
                  <Route path="/store" exact element={<Store />} />
                  <Route path="/store/basket" exact element={<StoreBasket />} />
                  <Route path="/store/checkout" exact element={<Checkout />} />
                  <Route path="/contact" exact element={<Contact />} />
                </Routes>
              </PayPalScriptProvider>
            </GigsContext.Provider>
          </ShoppingListContext.Provider>
        </BasketContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;