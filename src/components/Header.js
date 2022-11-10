import { AppBar, Toolbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createStyles, makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Typography from "@mui/material/Typography";

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbarMargin: {
      ...theme.mixins.toolbar,
    },
    logo: {
      height: "4em",
      marginRight: 10,
      align: "center",
    },
    tab: {
      ...theme.typography.tab,
      minWidth: "10em",
      MarginLeft: "25px",
    },
    tabContainer: {
      marginLeft: "auto",
    },
  })
);

function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/order" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/contact" && value !== 2) {
      setValue(2);
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters>
            {/* <img alt="PTA logo" src={logo} className={classes.logo} /> */}
            <Typography variant="h6" style={{ marginLeft: 10 }}>
              GXDMHC-PTA
            </Typography>
            <Tabs
              className={classes.tabContainer}
              value={value}
              onChange={handleChange}
              //   indicatorColor="secondary"
              textColor="inherit"
              //   variant="fullWidth"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab
                className={classes.tab}
                label="Home"
                component={Link}
                to="/"
              />
              <Tab
                className={classes.tab}
                label="Order"
                component={Link}
                to="/order"
              />
              <Tab
                className={classes.tab}
                label="Contact"
                component={Link}
                to="/contact"
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}

export default Header;
