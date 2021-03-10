import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage"
import {get_lists} from './services/list'

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      get_lists();
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
