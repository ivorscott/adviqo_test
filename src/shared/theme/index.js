import palette from "./palette";
import typography from "./typography";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const options = {
  typography,
  palette,
  spacing: 2,
};

export { options, createMuiTheme, MuiThemeProvider };
