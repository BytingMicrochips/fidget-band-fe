import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function SizeSelector({item}) {
    const [pickedSize, setPickedSize] = useState("");
    
    const handleChange = (event) => {
        const selected = event.target.value;
        if (selected.length != 0) {
            setPickedSize(selected)
        }    
    };

  return (
    <Box
      sx={{
        minWidth: "100%",
        position: "absolute",
        bottom: "-30px",
        right: -8,
        zIndex: 2,
        m: 1,
      }}
    >
      <FormControl
        fullWidth
        sx={{
          display: "-ms-inline-flexbox",
          bottom: "80px",
          backgroundColor: "rgba(13,13,13,0.65)",
          borderRadius: "5px",
          borderColor: "transparent",
          color: "rgba(255,255,255,0.98)",
        }}
      >
        <InputLabel
          id="sizeSelectorInput"
          sx={{
            color: "rgb(250,235,215)",
            borderColor: "transparent",
            borderRadius: "5px",
            fontFamily: "AveriaSansLibre-Bold",
            fontSize: "19px",
            width: "100%",
            textAlign: "center",
            position: "absolute",
            "&.Mui-focused": {
              borderColor: "transparent",
              fontSize: "19px",
              color: "rgba(209, 92, 42, 0.95)",
              position: "absolute",
              top: "-1px",
              left: "3px",
              textAlign: "left",
            },
          }}
        >
          size
        </InputLabel>
        <Select
          labelId="Size Selector"
          id="sizeSelectorSelect"
          label="Size"
          value={pickedSize}
          onChange={handleChange}
          sx={{
            fontFamily: "AveriaSansLibre-Regular",
            fontSize: "19px",
            color: "rgb(250,235,215)",
            height: "50px",
            ".MuiSvgIcon-root ": {
              fill: "rgb(245, 245, 245) !important",
            },
          }}
          inputProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  backgroundColor: "rgb(238, 238, 238)",
                },
              },
            },
          }}
        >
          {Object.keys(item.availableSizes).map((size) => {
            if (item.availableSizes[size] != 0) {
              return (
                <MenuItem
                  key={`menuItem${size}`}
                  value={size}
                  sx={{
                    fontFamily: "AveriaSansLibre-Regular",
                    color: "rgb(13,13,13)",
                  }}
                >
                  {size}
                </MenuItem>
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
