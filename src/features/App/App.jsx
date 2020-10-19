import React from "react";
import { AppBar } from "../../shared/components/AppBar";
import { Footer } from "../../shared/components/Footer";
import { Advisors } from "../Advisors";
import { Provider as ReduxProvider } from "react-redux";
import { options, createMuiTheme, MuiThemeProvider } from "../../shared/theme";
import { Paper } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import { store } from "../../store";
import "./styles.css";

const theme = createMuiTheme(options);

function App() {
  return (
    <ReduxProvider store={store}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <div className="app">
            <AppBar />
            <Paper className="app__layout" square={true}>
              <Advisors />
            </Paper>
            <Footer />
          </div>
        </MuiThemeProvider>
      </StylesProvider>
    </ReduxProvider>
  );
}

export { App };
