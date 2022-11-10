import React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import emailjs from "emailjs-com";
import ConfirmDialog from "./ConfirmDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import api from "../api/logcake";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: "0 auto",
      padding: "10px 10px",
    },
    button: { marginLeft: "5px", marginRight: "5px" },
  })
);

const pickupDates = [
  {
    name: "Sunday 12/11/2022 (8:00 AM - 2:00 PM)",
    value: "Sunday 12/11/2022 (8:00 AM - 2:00 PM)",
  },
  {
    name: "Sunday 12/18/2022 (8:00 AM - 2:00 PM)",
    value: "Sunday 12/18/2022 (8:00 AM - 2:00 PM)",
  },
  {
    name: "Friday 12/23/2022 (5:00 PM - 8:00 PM)",
    value: "Friday 12/23/2022 (5:00 PM - 8:00 PM)",
  },
];

export default function OrderForm() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [pickupDate, setPickupDate] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = () => {
    setTimeout(() => {
      setSnackbar({ ...snackbar, open: false });
    }, 1800);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const onChange = (event) => {
    let valid;

    switch (event.target.id) {
      case "email":
        setEmail(event.target.value);
        valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
          event.target.value
        );

        if (!valid) {
          setEmailHelper("Please enter a valid email");
        } else {
          setEmailHelper("");
        }
        break;
      case "phone":
        setPhone(event.target.value);
        valid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(
          event.target.value
        );

        if (!valid) {
          setPhoneHelper("Please enter a valid phone number");
        } else {
          setPhoneHelper("");
        }
        break;
      default:
        break;
    }
  };

  const clearForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setQuantity("1");
    setPickupDate("");
  };

  const submitHandler = async () => {
    const total = parseFloat(Number(quantity) * 45).toFixed(2);
    console.log(name, phone, email, quantity, pickupDate, total);

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    try {
      const response = await api.post(
        "/damhoang/google_sheets/YSdUjugxkTozkEYf?tabId=Sheet1",
        JSON.stringify([
          [
            name,
            email,
            phone,
            quantity,
            pickupDate,
            new Date().toLocaleString(),
            total,
          ],
        ]),
        axiosConfig
      );
      console.log(response);
      clearForm();
      setSnackbar({
        open: true,
        message: "Your order have been sent to Hội Phụ Huynh (PTA)!",
        severity: "success",
      });
    } catch (err) {
      console.log(err);
      setSnackbar({
        open: true,
        message:
          "We have encountered error sending your order to Hội Phụ Huynh (PTA)!",
        severity: "error",
      });
    }

    const templatePrams = {
      from_name: "Hội Phụ Huynh (PTA)",
      to_name: `${name}`,
      phone: `${phone}`,
      email: `${email}`,
      pickup_date: `${pickupDate}`,
      order: `Log Cake: ${quantity}, Order Total $${total}`,
    };
    emailjs.init("dleTTqZMgjwp5YeZO");
    emailjs.send("service_ao9wftm", "template_2nahi7v", templatePrams).then(
      (result) => {
        console.log("Your order have been sent to Hội Phụ Huynh (PTA)");
        // clearForm();
        // alert("Your order have been sent to Hội Phụ Huynh (PTA)");
        // // window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
        // setSnackbar({
        //   open: true,
        //   message: "Your order have been sent to Hội Phụ Huynh (PTA)!",
        //   severity: "success",
        // });
        // window.location.assign("/");
      },
      (error) => {
        console.log(error.text);
        // setSnackbar({
        //   open: true,
        //   message:
        //     "We have encountered error sending your order to Hội Phụ Huynh (PTA)!",
        //   severity: "error",
        // });
      }
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}></Grid>
      </Grid>
      <Card className={classes.card} raised={true} sx={{ maxWidth: 420 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" align="center" marginBottom={5}>
            Đơn Đặt Bánh (Log Cake Ordering)
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setConfirmOpen(true);
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  id="name"
                  name="name"
                  label="Họ và Tên (Full Name)"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={onChange}
                  error={emailHelper.length !== 0}
                  helperText={emailHelper}
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Điện Thoại (Phone Number)"
                  value={phone}
                  onChange={onChange}
                  error={phoneHelper.length !== 0}
                  helperText={phoneHelper}
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="quantity"
                  type="number"
                  name="quantity"
                  label="Số lượng bánh (number of log-cake)"
                  variant="outlined"
                  InputProps={{
                    inputProps: { min: 1 },
                  }}
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="pickupDate"
                  name="pickupDate"
                  select
                  label="Ngày giao bánh (pick-up date)"
                  value={pickupDate}
                  onChange={(event) => setPickupDate(event.target.value)}
                  required
                  fullWidth
                >
                  {pickupDates.map((date) => (
                    <MenuItem key={date.value} value={date.value}>
                      {date.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={12} gutterBottom>
                <Typography variant="body1" align="center" gutterBottom>
                  Xin trả tiền trước qua Zelle <br />
                  (Donnie Nguyen - (469) 288-0806)
                  <br />
                  please make your payment via Zelle account <br />
                  Donnie Nguyen (469) 288-0806).
                </Typography>
              </Grid>
              <Grid item style={{ margin: "0 auto", display: "flex" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                  disabled={
                    name.length === 0 ||
                    phone.length === 0 ||
                    phoneHelper.length !== 0 ||
                    email.length === 0 ||
                    emailHelper.length !== 0 ||
                    pickupDate.length === 0
                  }
                >
                  Send Order
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                  component={Link}
                  to="/"
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </form>
          <ConfirmDialog
            title="Confirm Order?"
            open={confirmOpen}
            setOpen={setConfirmOpen}
            onConfirm={submitHandler}
          >
            Your order: <br />
            Log cake: {quantity} <br />
            <br />
            Are you sure you want to send the order to Hội Phụ Huynh (PTA)?
          </ConfirmDialog>
          {snackbar.open && (
            <Snackbar
              open={snackbar.open}
              autoHideDuration={600}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
                {snackbar.message}
              </Alert>
            </Snackbar>
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
