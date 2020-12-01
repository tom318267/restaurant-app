import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import RestaurantDetailsPage from "./components/RestaurantDetailsPage/RestaurantDetailsPage";
import UpdateRestaurant from "./components/UpdateRestaurant/UpdateRestaurant";
import "./App.css";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/restaurants/:id/update"
              component={UpdateRestaurant}
            />
            <Route
              exact
              path="/restaurants/:id"
              component={RestaurantDetailsPage}
            />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
