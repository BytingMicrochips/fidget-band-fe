import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import { BasketContext } from "../App.jsx";
import { useContext, useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const StoreBasket = () => {
  const drawerWidth = 240;
    const [basket, setBasket] = useContext(BasketContext);
    const [order, setOrder] = useState([])
    
    useEffect(() => {
        const toOrder = basket.filter((merchItem) => (Object.values(merchItem)[0] !== 0))
        setOrder(toOrder)
    },[basket])
    
    return (
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            padding: 0,
          }}
        >
          <DrawerNav />
          <h1>Your basket</h1>
          <div className="basketWrapper">
            {order.map((eachItem) => {
                return (
                    
                  <>
                    <div className="basketItem">
                      <h2>{Object.keys(eachItem)[0]}</h2>
                      <button>
                        <IndeterminateCheckBoxIcon />
                      </button>
                      <h2>{Object.values(eachItem)[0]}</h2>
                      <button>
                        <AddBoxIcon />
                      </button>
                      <h2>cost</h2>
                    </div>
                  </>
                );
            })}
          </div>
        </Box>
      </>
    );
}

export default StoreBasket;