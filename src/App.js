import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Order from "./pages/Order";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/Theme";
import DrawerAppBar from "./components/DrawerAppBar";

function App() {
  const cakes = [
    {
      id: 1,
      image: "/log_cake.PNG",
      name: "Bánh LOG CAKE, vị MOCHA",
      description: ``,
      price: 45,
    },
    {
      id: 2,
      image: "/poinsettia.PNG",
      name: "POINSETTIA",
      description: ``,
      price: 25,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <ResponsiveAppBar /> */}
        <DrawerAppBar />
        {/* <Header /> */}
        <Switch>
          <Route exact path="/">
            <Home cakes={cakes} />
          </Route>
          <Route exact path="/home">
            <Home cakes={cakes} />
          </Route>
          <Route path="/order">
            <Order />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
