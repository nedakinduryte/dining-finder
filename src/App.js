import React from 'react';
import Form from './components/Form'


const API_KEY = "2d0e89daf27dd516eb7dcf5208bd83de";

class App extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const food = e.target.food.value;
    const api_call = await fetch(`https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${location}&count=5&sort=rating&order=desc`, {headers: {'Content-Type': 'application/json', "user-key": API_KEY}})
    const data = await api_call.json();
    console.log(data);
  };

  render() {
    return (
      <Form handleSubmit={ this.handleSubmit } />
    )
  }
}

export default App;
