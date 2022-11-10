import React from "react";

import { Container } from "@mui/material";
import CakeCard from "../components/CakeCard";
import { createStyles, makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import OrderForm from "../components/OrderForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: "0 auto",
      padding: "5px 5px",
    },
    button: { marginLeft: "5px", marginRight: "5px" },
  })
);

export default function Order() {
  const classes = useStyles();
  return (
    <>
      <Container fixed>
        <OrderForm />
      </Container>
    </>
  );
}
