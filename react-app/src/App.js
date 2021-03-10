import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage"
import {get_lists} from './services/list'
import {ListContext} from './context'


function App() {
  const [loaded, setLoaded] = useState(false);
  const [lists, setLists] = useState([])

  useEffect(() => {
    (async() => {
      const res = await get_lists();
      setLists(res)
      setLoaded(true)
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ListContext.Provider value={lists}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ListContext.Provider>
  );
}

export default App;
