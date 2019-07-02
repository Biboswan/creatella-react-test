import React, { useEffect } from "react";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import theme from "../theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "../pages/Home";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column"
  }
});

const App = () => {
  const classes = useStyles();
  useEffect(() => {
    console.log("React App Running...");
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
