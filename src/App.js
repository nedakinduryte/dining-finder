import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Result from "./components/Result";

const App = () => (
    <HashRouter>
        <Switch>
            <Route path="/" component={Search} exact />
            <Route path="/restaurants" component={Result} />
        </Switch>
    </HashRouter>
);

export default App;
