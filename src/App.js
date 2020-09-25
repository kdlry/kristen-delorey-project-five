import React, { Component } from 'react';
import FindName from './FindName';
import SearchImage from './SearchImage';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageSearch: '',
      imageResults: [],
      vinylBand: '',
      vinylImage: [],
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1><span className="slanted">Vinyl Resting Place</span></h1>
          </div>
        </header>

        <main>
          <div className="wrapper">
            <section>
              <FindName 
                vinylBand={this.state.vinylBand}
              />

              <SearchImage 
                imageSearch={this.state.imageSearch}
              />

              <div>

              </div>
            </section>

            <section>
              {/* Holding section for firebase database */}
            </section>
          </div>
        </main>

        <footer>
          <p>Created by Kristen Delorey at <a href="https://junocollege.com/">Juno College</a></p>
          <p>Copyright &#169 2020 Juno College of Technology</p>
          {/* <p>Follow me on <a href="https://junocollege.com/" role="link"></a></p> */}
        </footer>
      </div>
    );
  }
}

export default App;
