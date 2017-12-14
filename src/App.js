import React, { Component } from 'react';
import './App.css';
import List from './components/List'

class App extends Component {
  constructor(){
    super()
    this.state = {
        data: [{title: "Little Life", author: "Hanya Yanagihara", price: "$12"}, {title: "Seven Days of Us: A Novel", author: "Francesca Hornak", price:"$17"}, {title: "The Girl on the Train", author: "Paula Hawkins", price:"$10"}]
    }   
  }

  render() {
    return (
      <div className="App">
        <List data={this.state.data}/>
      </div>
    );
  }
}

export default App;
