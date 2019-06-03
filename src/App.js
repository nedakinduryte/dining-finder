import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Form from './components/Form';
import Info from './components/Info';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={ Form } exact />
      <Route path="/restaurants" component={ Info } />
    </Switch>
  </BrowserRouter>
)


export default App;