import React, { Component } from 'react';
import axios from 'axios';
import BandForm from './BandForm';
import ImageForm from './ImageForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      band: '',
      image: '',
      imageCapture: '',
      imageResults: [],
      // vinylImages: [],
    }
  }

  // ImageForm input handling
  handleImageValue = (e) => {
    // console.log(e.target.value);

    this.setState({
      image: e.target.value
    });
  }

  handleImageSubmit = (e) => {
    e.preventDefault();

    const imageKeyword = this.state.image;
    console.log(imageKeyword);

    const apiAuth = '563492ad6f917000010000012aa97dcd697246f8b109b93cf6e01222';
    const apiURL = 'https://api.pexels.com/v1/search'

    axios({
      method: 'GET',
      headers: {
        'Authorization': `${apiAuth}`,
      },
      url: apiURL,
      dataResponse: 'json',
      params: {
        query: `${imageKeyword}`,
        per_page: 6,
      },
    }).then((res) => {

      let apiResults = res.data.photos

      console.log(apiResults);

      this.setState({
        imageResults: apiResults
      });


    })

    this.setState({
      image: ''
    });
  }

  // NameForm Input handling
  handleBandValue = (e) => {
    // console.log(e.target.value);

    this.setState({
      band: e.target.value,
    });
  }

  handleBandSubmit = (e) => {
    e.preventDefault();

    const bandName = this.state.band;
    console.log(bandName);

    this.setState({
      band: '',
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
                bandValue={this.state.band} 
                setBandValue={this.handleBandValue}
                saveBandValue={this.handleBandSubmit}
              />

              <ImageForm 
                imageValue={this.state.image}
                setImageValue={this.handleImageValue}
                saveImageValue={this.handleImageSubmit}
              />

              <div>
                
              </div>

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
