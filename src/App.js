import React, { Component } from 'react';
import axios from 'axios';
import BandForm from './Components/BandForm';
import ImageForm from './Components/ImageForm';
import StagingArea from './Components/StagingArea';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bandName: '',
      bandNameCapture: '',
      imageSearch: '',
      imageSearchCapture: '',
      imageResults: [],
      finalImageCapture: '',
      // vinylImages: [],
    }
  }

  // NameForm input handling -----------------------------------
  handleBandValue = (e) => {

    this.setState({
      bandName: e.target.value,
    });
  }

  handleBandSubmit = (e) => {
    e.preventDefault();

    const bandNameValue = this.state.bandName;
    this.state.bandNameCapture = bandNameValue;

    this.setState({
      bandName: '',
      bandNameCapture: bandNameValue,
    });
  }

  // ImageForm input handling -----------------------------------
  handleImageValue = (e) => {

    this.setState({
      imageSearch: e.target.value
    });
  }

  handleImageSubmit = (e) => {
    e.preventDefault();

    const imageValue = this.state.imageSearch;
    this.state.imageSearchCapture = imageValue;

    this.setState({
      imageSearch: '',
      imageSearchCapture: imageValue,
    });

    // console.log(this.state.imageSearchCapture);

    // API Call - using image keyword search
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
        query: `${this.state.imageSearchCapture}`,
        per_page: 6,
      },
    }).then((res) => {

      let apiResults = res.data.photos
      // console.log(apiResults);

      this.setState({
        imageResults: apiResults
      });
    })

    this.setState({
      imageSearch: ''
    });
  }

  // StagingArea - image selection -----------------------------------
  handleKeep = (finalImage) => {

      const imageList = [...this.state.imageResults];

      const updatedList = imageList.filter((_, index) => {
          return finalImage === index;
      });
      console.log(updatedList);

      const selectedImage = updatedList[0].src.medium

      this.state.finalImageCapture = selectedImage

      this.setState({
        imageResults: updatedList,
        finalImageCapture: selectedImage,
      });
      // console.log(this.state.finalImageResult);
  }

  render() {
    // Conditional statements
    // let {bandNameCapture} = this.state;
    // if (this.state = '',
    // return (

    // )


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
                bandValue={this.state.bandName} 
                setBandValue={this.handleBandValue}
                saveBandValue={this.handleBandSubmit}
              />

              <ImageForm 
                imageValue={this.state.imageSearch}
                setImageValue={this.handleImageValue}
                saveImageValue={this.handleImageSubmit}
              />

              <div className="outputContainer">
                <ul>
                  {this.state.imageResults.map((image, index) => {
                    return (
                      <StagingArea
                        url={image.src.medium}
                        // selectImage={() => {this.handleKeep()}} 
                        selectImage={() => this.handleKeep(index)} 
                        key={index}
                      />
                    );
                  })}
                </ul>
              </div>

            </section>

            <section>

            {/* <div>
              <img> 
              <p></p>
            </div> */}

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
