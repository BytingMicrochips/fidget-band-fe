import DrawerNav from "./draw-nav.jsx";
import Box from "@mui/material/Box";
import { BasketContext, ShoppingListContext } from "../App.jsx";
import { useContext, useEffect, useState } from "react";
import MailChimp from "./mailChimp.jsx";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = (order, totalPrice) => {
    const drawerWidth = 240;
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
          <div className="pageGradientWrapper">
            <div className="pageGigsHeadings">
              <h2>Checkout</h2>
            </div>
          </div>
          <PayPalButtons />
        </Box>
      </>
    );
}

export default Checkout;