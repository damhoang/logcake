import React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import emailjs from "emailjs-com";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: "0 auto",
      padding: "10px 10px",
    },
  })
);
export default function ContactForm() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneHelper, setPhoneHelper] = useState("");
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [message, setMessage] = useState("");
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
          setEmailHelper("Please enter valid email");
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
          setPhoneHelper("Please enter valid phone number");
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
    setMessage("");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(name, phone, email, message);
    const templatePrams = {
      from_name: `${name}`,
      to_name: "damhoang@gmail.com",
      phone: `${phone}`,
      email: `${email}`,
      message: `${message}`,
    };
    emailjs.init("dleTTqZMgjwp5YeZO");
    emailjs.send("service_ao9wftm", "template_q6uhurs", templatePrams).then(
      (result) => {
        clearForm();
        // alert("Your message have been sent to Hội Phụ Huynh (PTA)!");
        // window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
        setSnackbar({
          open: true,
          message: "Your message have been sent to Hội Phụ Huynh (PTA)!",
          severity: "success",
        });
        // window.location.assign("/");
      },
      (error) => {
        console.log(error.text);
        setSnackbar({
          open: true,
          message:
            "We have encountered error sending your message to Hội Phụ Huynh (PTA)!",
          severity: "error",
        });
      }
    );
  };

  return (
    <React.Fragment>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} gutterBottom></Grid>
      </Grid>
      <Card className={classes.card} raised={true} sx={{ maxWidth: 420 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">
            Liên Lạc (Contact Us)
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Please contact Ms. Hương Hoàng (469) 288-0806 <br />
            or send us a message with your contact info.
          </Typography>

          <form onSubmit={submitHandler}>
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
                  id="message"
                  label="Message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                />
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
                    message.length === 0
                  }
                >
                  Send Message
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
