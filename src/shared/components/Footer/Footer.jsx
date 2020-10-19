import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#2F3131",
    padding: theme.spacing() * 20,
    color: "#ffffff",
    fontFamily: theme.typography.fontFamily,
  },
}));

const Location = () => (
  <>
    <div>adviqo GmbH</div>
    <div>Max-Dohrn-Str. 8 – 10</div>
    <div>D-10589 Berlin</div>
  </>
);

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root} elevation={1} square="true">
      <Location />
    </div>
  );
};

export { Footer };
