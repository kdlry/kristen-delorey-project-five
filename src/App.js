import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import BandForm from './Components/BandForm';
import ImageForm from './Components/ImageForm';
import ImageSelection from './Components/ImageSelection';
import StagingArea from './Components/StagingArea';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bandName: "",
      bandNameCapture: "",
      imageSearch: "",
      imageSearchCapture: "",
      imageResults: [],
      finalImageCapture: "",
      buttonClicked: false,
      // vinylImages: [],
    };
  }

  // Band Form - Input + submit handling -----------------------------------
  handleBandValue = (e) => {
    this.setState({
      bandName: e.target.value,
    });
  };

  handleBandSubmit = (e) => {
    e.preventDefault();

    if (this.state.bandName === "") {
      Swal.fire({
        title: "Missing info",
        text: "You need a band name to start.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }

    const bandNameValue = this.state.bandName;
    this.state.bandNameCapture = bandNameValue;

    this.setState({
      bandName: "",
      bandNameCapture: bandNameValue,
    });
  };

  // Image Form - Input + submit handling -----------------------------------
  handleImageValue = (e) => {
    this.setState({
      imageSearch: e.target.value,
    });
  };

  handleImageSubmit = (e) => {
    e.preventDefault();

    if (this.state.bandNameCapture === "") {
      Swal.fire({
        title: "Missing info",
        text: "You need a band name to start",
        icon: "error",
        confirmButtonText: "Okay!",
      });
    }

    const imageValue = this.state.imageSearch;
    this.state.imageSearchCapture = imageValue;

    this.setState({
      imageSearch: "",
      imageSearchCapture: imageValue,
    });

    // API Call - using image keyword search
    const apiAuth = "563492ad6f917000010000012aa97dcd697246f8b109b93cf6e01222";
    const apiURL = "https://api.pexels.com/v1/search";

    axios({
      method: "GET",
      headers: {
        Authorization: apiAuth,
      },
      url: apiURL,
      dataResponse: "json",
      params: {
        query: this.state.imageSearchCapture,
        per_page: 6,
      },
    })
      .then((res) => {
        let apiResults = res.data.photos;
        console.log(res);
        if (res.data.total_results == 0) {
          Swal.fire({
            title: "No results",
            text: "Try another keyword.",
            icon: "warning",
            confirmButtonText: "Okay.",
          });
        }

        this.setState({
          imageResults: apiResults,
        });
      })
      .catch((err) => {
        if (err.response && this.state.bandNameCapture !== "") {
          Swal.fire({
            title: "Missing info",
            text:
              "Looks like the input field is empty... try addind a keyword.",
            icon: "error",
            confirmButtonText: "Got it!",
          });
        }
      });

    this.setState({
      imageSearch: "",
    });
  };

  // Reset button handling -----------------------------------
  handleReset = () => {
    Swal.fire({
      title: "Are you sure you want to start over?",
      text: "This action will reload the page and clear all inputs/outputs.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isDenied) {
      } else if (result.isConfirmed) {
        document.location.reload();
      }
    });
  };

  // Image Selection - Input + Submit handling -----------------------------------
  handleKeep = (finalImage) => {
    const imageList = [...this.state.imageResults];

    const updatedList = imageList.filter((_, index) => {
      return finalImage === index;
    });

    const selectedImage = updatedList[0].src.medium;
    this.state.finalImageCapture = selectedImage;

    this.setState({
      imageResults: updatedList,
      finalImageCapture: selectedImage,
    });
  };

  // Staging Area - Submit handling -----------------------------------
  handleVinylRender = () => {

    const {bandNameCapture: band, finalImageCapture: image} = this.state;
    const album = {
      band,
      image,
      // label: ,
      // record: ,

    }

    this.setState({
      buttonClicked: true,
    });
  }  

  render() {
    // Copyright for footer
    const copyright = "\u00A9";

    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <h1>
              <span className="slanted">Vinyl Resting Place</span>
            </h1>
          </div>
        </header>

        <main>
          <div className="wrapper">
            <section>
              <div className="formInputs">
                <BandForm
                  bandValue={this.state.bandName}
                  setBandValue={this.handleBandValue}
                  saveBandValue={this.handleBandSubmit}
                />

                {this.state.bandNameCapture !== "" && (
                  <p className="conf">
                    Cool beans! Your band is called:{" "}
                    <span>{this.state.bandNameCapture}</span>
                  </p>
                )}

                <ImageForm
                  imageValue={this.state.imageSearch}
                  setImageValue={this.handleImageValue}
                  saveImageValue={this.handleImageSubmit}
                />

                <button
                  className="resetButton"
                  type="reset"
                  onClick={this.handleReset}
                >
                  start over
                </button>
              </div>

              <div className="imagesContainer">
                <ul>
                  {this.state.imageResults.map((image, index) => {
                    return (
                      <ImageSelection
                        url={image.src.medium}
                        selectImage={() => this.handleKeep(index)}
                        key={index}
                      />
                    );
                  })}
                </ul>
              </div>

              {this.state.bandNameCapture !== "" &&
                this.state.finalImageCapture !== "" && (
                  <StagingArea createVinyl={this.handleVinylRender} />
                )}
            </section>

            {this.state.buttonClicked === true && (
              <section className="vinylOutput">
                <div className="vinylRecord">
                  <p>{this.state.bandNameCapture}</p>
                  <img className="vinylCover" src={this.state.finalImageCapture} alt="Vinyl record cover" />
                  <img className="vinylLabel" src="./assets/vinylLabel.png" alt="Vinyl record label" />
                  <img className="vinylRecord" src="./assets/vinylRecord.png" alt="Vinyl record" />
                </div>
                <div className="vinylRecord">
                  <p>{this.state.bandNameCapture}</p>
                  <img className="vinylCover" src={this.state.finalImageCapture} alt="Vinyl record cover" />
                  <img className="vinylLabel" src="./assets/vinylLabel.png" alt="Vinyl record label" />
                  <img className="vinylRecord" src="./assets/vinylRecord.png" alt="Vinyl record" />
                </div>
                <div className="vinylRecord">
                  <p>{this.state.bandNameCapture}</p>
                  <img className="vinylCover" src={this.state.finalImageCapture} alt="Vinyl record cover" />
                  <img className="vinylLabel" src="./assets/vinylLabel.png" alt="Vinyl record label" />
                  <img className="vinylRecord" src="./assets/vinylRecord.png" alt="Vinyl record" />
                </div>
                <div className="vinylRecord">
                  <p>{this.state.bandNameCapture}</p>
                  <img className="vinylCover" src={this.state.finalImageCapture} alt="Vinyl record cover" />
                  <img className="vinylLabel" src="./assets/vinylLabel.png" alt="Vinyl record label" />
                  <img className="vinylRecord" src="./assets/vinylRecord.png" alt="Vinyl record" />
                </div>
              </section>
            )}
          </div>
        </main>

        <footer>
          <p>
            Created by Kristen Delorey at{" "}
            <a href="https://junocollege.com/">Juno College</a>
          </p>
          <p>Copyright {copyright} 2020 Juno College of Technology</p>
          {/* <p>Follow me on <a href="https://junocollege.com/" role="link"></a></p> */}
        </footer>
      </div>
    );
  }
}

export default App;
