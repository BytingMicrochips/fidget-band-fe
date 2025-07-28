import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SizeSelector(shopStock) {
    const [size, setSize] = React.useState("");
    
    const handleChange = (event) => {
        setSize(event.target.value);
    };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sizeSelectorInput">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="sizeSelectorSelect"
          value={size}
          label="Size"
          onChange={handleChange}
        >
                  {Object.keys(shopStock.shopStock[0].availableSizes).map((size) => {
                      if (shopStock.shopStock[0].availableSizes[size] != 0) {
                          return (
                              <MenuItem value={size}>{size}</MenuItem>
                          )
                      }
              
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
