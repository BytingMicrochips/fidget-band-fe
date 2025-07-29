import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Fragment } from "react";

export default function SizeSelector({shopStock, item}) {
    const [size, setSize] = React.useState("");
    
    const handleChange = (size) => {
      setSize(size);
    };

  return (
      <Box sx={{
          minWidth: "100%",
          position: "absolute",
          bottom: "-30px",
          right: -7,
          zIndex: 2,
          m: 1
      }}>
    <FormControl
      fullWidth
      sx={{
        display:"-ms-inline-flexbox",
        bottom: "80px",
        backgroundColor: "rgba(13,13,13,0.45)",
          borderRadius: "5px",
          borderColor: "transparent",
      }}
    >
      <InputLabel
        id="sizeSelectorInput"
        sx={{
            color: "rgba(255,255,255,0.98)",
          borderColor: "transparent",
          borderRadius: "5px",
            fontFamily: "AveriaSansLibre-Regular",
          fontSize: "16px"
        }}
      >
        Size
      </InputLabel>
      <Select
        labelId="Size Selector"
        id="sizeSelectorSelect"
        size={size}
        label="Size"
        onChange={handleChange}
      >
        {Object.keys(item.availableSizes).map((size) => {
          if (item.availableSizes[size] != 0) {
            return (
              <Fragment key={`menuItem${size}`}>
                <MenuItem value={size}>{size}</MenuItem>
              </Fragment>
            );
          }
        })}
      </Select>
    </FormControl>
   </Box>
  );
}

// Needs to check if amount in stock - current basket = 0, then disallow selct options if true
// Essential to prevent adding to basket amounts greater than items in stock
