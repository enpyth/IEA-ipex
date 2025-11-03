"use client";

import { createTheme } from "@mui/material/styles";

// Align MUI primary color with the app's brand primary (#E7400B)
export const muiTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#E7400B",
            light: "#f07642",
            dark: "#b8390f",
            contrastText: "#ffffff",
        },
    },
});


