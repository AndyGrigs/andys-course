import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    //@ts-ignore
    shadows: ["none"],
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
