import React, { Component } from 'react';
import BandForm from './BandForm';
import ImageForm from './ImageForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageSearch: '',
      imageResults: [],
      band: '',
      // vinylImage: [],
    }
  }

  // ImageForm input handling

  // NameForm Input handling
  handleNameValue = (e) => {
    console.log(e.target.value);

    this.setState({
      band: e.target.value
    });
  }

  handleNameSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    this.setState({
      band: ''
    });
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
              <BandForm 
              value={this.state.band} 
              setValue={this.handleNameValue}
              saveValue={this.handleNameSubmit}
              />

              <ImageForm 
                imageSearch={this.state.imageSearch}
              />

              <div></div>
            </section>

            {/* <section>

              <div></div>

            </section> */}
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
