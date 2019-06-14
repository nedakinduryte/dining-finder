import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './components/Search';
import Info from './components/Info';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={ Search } exact />
      <Route path="/restaurants" component={ Info } />
    </Switch>
  </BrowserRouter>
)


export default App;