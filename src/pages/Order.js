import React from "react";

import { Container } from "@mui/material";
import OrderForm from "../components/OrderForm";

export default function Order() {
  return (
    <>
      <Container fixed>
        <OrderForm />
      </Container>
    </>
  );
}
