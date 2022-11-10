import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Unstable_Grid2";
import { createStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: "0 auto",
      padding: "10px 10px",
    },
  })
);

export default function CakeCard(props) {
  const classes = useStyles();
  const { image, name, description, price } = props;
  return (
    <React.Fragment>
      <Box>
        <Card sx={{ maxWidth: 645 }} className={classes.card} raised={true}>
          <CardMedia component="img" height="445" image={image} alt={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="body1">{description}</Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant="body1">Giá (Price) ${price}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button component={Link} to="/order">
              Đặt Bánh (Order Online)
            </Button>
            <Button component={Link} to="/contact">
              Liên Lạc (Contact Us)
            </Button>
          </CardActions>
        </Card>
      </Box>
    </React.Fragment>
  );
}
