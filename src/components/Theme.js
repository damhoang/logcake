import { createTheme } from "@mui/material/styles";

const ptaPrimary = "#0B72B9";
const ptaSecondary = "#757575";

export default createTheme({
  palette: {
    primary: {
      main: `${ptaPrimary}`,
    },
    secondary: {
      main: `${ptaSecondary}`,
    },
  },
});
