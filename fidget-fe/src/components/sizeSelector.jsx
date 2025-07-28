import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SizeSelector({shopStock, item}) {
    const [size, setSize] = React.useState("");
    
    const handleChange = (event) => {
        setSize(event.target.value);
    };

  return (
    <Box sx={{ minWidth: 80 }}>
      <FormControl fullWidth>
        <InputLabel id="sizeSelectorInput">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="sizeSelectorSelect"
          value={size}
          label="Size"
          onChange={handleChange}
        >
                {Object.keys(item.availableSizes).map((size) => {
                      if (item.availableSizes[size] != 0) {
                          return (
                              <MenuItem value={size}>{size}</MenuItem>
                          )
                      }
                  })
                }
        </Select>
      </FormControl>
    </Box>
  );
}

// Needs to check if amount in stock - current basket = 0, then disallow selct options if true
// Essential to prevent adding to basket amounts greater than items in stock
