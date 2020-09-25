import React, { Component } from 'react';
import FindName from './FindName';
import SearchImage from './SearchImage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1><span className="slanted">Vinyl Resting Place</span></h1>
        </header>
        <FindName />
        <SearchImage />
      </div>
    );
  }
}

export default App;
