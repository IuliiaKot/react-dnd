import React, { Component } from 'react';
import './App.css';
import List from './components/List'

class App extends Component {
  constructor(){
    super()
    this.state = {
        data: [{id: 1, title: "Little Life", author: "Hanya Yanagihara", price: "$12"}, {id: 2, title: "Seven Days of Us", author: "Francesca Hornak", price:"$17"}, {id: 3, title: "The Girl on the Train", author: "Paula Hawkins", price:"$10"}]
    }   
  }

  render() {
    return (
      <div className="App">
        <List />
      </div>
    );
  }
}

export default App;
