import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage/homepage";
import ShopPage from "./Pages/Shop/ShopPage";
import "./App.css";
import Header from "./Components/Header/Header";

const hats = () => <h1>hats</h1>;
function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
