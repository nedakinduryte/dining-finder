import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './components/Search';
import Result from './components/Result';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={ Search } exact />
      <Route path="/restaurants" component={ Result } />
    </Switch>
  </BrowserRouter>
)


export default App;