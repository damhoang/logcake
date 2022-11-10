import React from "react";
import { Container } from "@mui/material";
import CakeCard from "../components/CakeCard";
import { createStyles, makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import merry_christmas from "../assets/merry_christmas.PNG";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      margin: "0 auto",
      padding: "5px 5px",
    },
    button: { marginLeft: "5px", marginRight: "5px" },
    logo: {
      height: "6em",
      marginRight: 5,
      align: "center",
    },
  })
);

export default function Home(props) {
  const { cakes } = props;
  const classes = useStyles();

  return (
    <>
      <Container fixed>
        <Grid container className={classes.card} spacing={5}>
          <Grid item xs={12} md={2}>
            <img
              alt="Merry Christmas"
              src={merry_christmas}
              className={classes.logo}
            />
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="h4" gutterBottom>
              Hội Phụ Huynh (PTA)
            </Typography>
            <Typography variant="h5">
              Hội Phụ Huynh (PTA) Trung Tâm Giáo Dục Thánh An Phong (GX DMHCG)
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="h5" color="red" align="center" gutterBottom>
              Chương Trình Bán Bánh Gây Quĩ Cho Hội Phụ Huynh (PTA), <br />
              Giáo Xứ Đức Mẹ Hằng Cứu Giúp
            </Typography>
            <Typography variant="h5" color="red">
              Bánh LOG CAKE, vị MOCHA (xem hình)
            </Typography>
            <Typography variant="body1" gutterBottom>
              • Giá: $45/cái <br />
              • Bánh sẽ được đặt và bán tại cuối nhà thờ, trước & sau các thánh
              lễ 7:30am, 10am, và 12pm trong hai Chúa Nhật ngày 11 và 18, tháng
              12 <br />
              • Bánh cũng có thể được đặt mua online (hoặc qua điện thoại) từ
              nay cho đến hết thứ Tư, ngày 21 tháng 12 <br />
              • Nhận bánh: Chúa Nhật, ngày 11 tháng 12; Chúa Nhật, ngày 18 tháng
              12; và thứ Sáu, ngày 23 tháng 12 tại nhà thờ (2121 Apollo Road,
              Garland, Texas). <br />• Bánh đặt cho thứ Sáu, ngày 23 tháng 12 sẽ
              được nhận tại hội trường thánh An Phong từ 5pm tới 8pm
            </Typography>
            <Typography variant="body" gutterBottom>
              Đặt bánh online xin bấm
              <Button component={Link} to="/order">
                Đặt Bánh
              </Button>
              <br />
              {/* <a href="https://forms.gle/Tpg2rcGsmC9DcDyWA">Order</a>
              <br /> */}
              Đặt bánh qua điện thoại: Cô Hương Hoàng (469) 288-0806
            </Typography>
            <Typography variant="h5" color="red">
              POINSETTIA
            </Typography>
            <Typography variant="body1" gutterBottom>
              • Giá: $25/cái <br />• Ngoài bánh ra, hoa POINSETTIA cũng sẽ được
              bán tại cuối nhà thờ vào Chúa Nhật, ngày 18 tháng 12 trước & sau
              các thánh lễ.
            </Typography>
            <Typography variant="h5" color="red">
              LOG CAKE, MOCHA FLAVOR (image attached)
            </Typography>
            <Typography variant="body1" gutterBottom>
              • Price: $45/each <br />• Cakes are sold before and after 7:30am,
              10am, and 12pm masses, Sundays 11th & 18th of December in front of
              church’s entrances. <br />
              • Cake can also be ordered ONLINE (or by PHONE) from NOW until end
              of Wednesday, 12/21. <br />
              • Cake pickup dates: Sunday 12/11; Sunday 12/18; And Friday 12/23
              at church (2121 Apollo Road, Garland, Texas). <br />• Friday 12/23
              pickups are held at the church’s St. Alphonsus Center from 5pm to
              8pm.
            </Typography>

            <Typography variant="h5" color="red">
              POINSETTIA
            </Typography>
            <Typography variant="body1" gutterBottom>
              • Price: $25/each <br />• We also have POINSETTIA sales in front
              of church’s entrances on Sunday 12/18 before and after masses.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Click to order online
              <Button component={Link} to="/order">
                Order
              </Button>
              <br />
              {/* <a href="https://forms.gle/Tpg2rcGsmC9DcDyWA">Order</a>
              <br /> */}
              Order via telephone: Ms. Hương Hoàng (469) 288-0806{" "}
            </Typography>
          </Grid>
          {cakes.map((cake) => {
            return (
              <Grid key={cake.id} item xs={12} md={6}>
                <CakeCard
                  image={cake.image}
                  name={cake.name}
                  description={cake.description}
                  price={cake.price}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
