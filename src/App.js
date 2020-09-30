import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import firebase from './Components/firebase';
import BandForm from './Components/BandForm';
import ImageForm from './Components/ImageForm';
import ImageSelection from './Components/ImageSelection';
import StagingArea from './Components/StagingArea';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isActive: true,
      bandName: "",
      bandNameCapture: "",
      imageSearch: "",
      imageResults: [],
      finalImageCapture: "",
      buttonClicked: false,
      vinylFinal: [],
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const newVinylFinal = [];
      const data = response.val();

      console.log(data);

      for (let key in data) {
        newVinylFinal.push({
          key: key,
          band: data[key].band,
          image: data[key].image,
          label: data[key].label,
          record: data[key].record,
        });
      }

      this.setState({
        vinylFinal: newVinylFinal,
      });

      console.log(this.state.vinylFinal);
    });
  }

  handleHide = () => {
    this.setState({
      isActive: false,
    });
  };

  handleShow = () => {
    this.setState({
      isActive: true,
    });
  };

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
    } else {

      this.setState(
        {
          bandNameCapture: this.state.bandName,
        },
        () => {
          this.setState({
            bandName: "",
          });
        }
      );
      this.handleHide();
    }
  };

  // Image Form - Input + submit handling -----------------------------------
  handleImageValue = (e) => {
    this.setState({
      imageSearch: e.target.value,
    });

  };

  handleImageSubmit = (e) => {
    e.preventDefault();

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
        query: this.state.imageSearch,
        per_page: 6,
      },
    })
      .then((res) => {
        let apiResults = res.data.photos;
        console.log(res);
        if (res.data.total_results === 0) {
          Swal.fire({
            title: "No results",
            text: "Try another keyword.",
            icon: "warning",
            confirmButtonText: "Okay.",
          });
        } else {
          this.setState({
            imageResults: apiResults,
            imageSearch: "",
          });

          this.handleHide();
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Missing info",
          text: "Looks like the input field is empty... try addind a keyword.",
          icon: "error",
          confirmButtonText: "Got it!",
        });
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

    this.setState({
      imageResults: updatedList,
      finalImageCapture: selectedImage,
    });
  };

  // Staging Area - Submit handling -----------------------------------
  handleVinylRender = () => {
    const { bandNameCapture: band, finalImageCapture: image } = this.state;
    const vinyl = {
      band,
      image,
      // timestamp: (javascript date syntax)
      label: "./assets/vinylLabel.png",
      record:
        "https://drive.google.com/uc?export=view&id=1jx-571vPoGr3N79uBbkVazJv107Qxisv",
      label:
        "https://drive.google.com/uc?export=view&id=1BK9JMkP6zPkG993koRQ6kQn6pwrfE-Lu",
    };
    const dbRef = firebase.database().ref();

    dbRef.push(vinyl);

    this.setState({
      buttonClicked: true,
    });
  };

  // Remove vinyl from Firebase -----------------------------------
  handleVinylRemove = (vinylKey) => {
    console.log(vinylKey, 'I work');

    const dbRef = firebase.database().ref();

    dbRef.child(vinylKey).remove();
  };

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
            <h2>The Vinyl Cover Creator</h2>
          </div>
        </header>

        <main>
          <div className="resetContainer">
            <button
              className="resetButton"
              type="reset"
              onClick={this.handleReset}
            >
              start over
            </button>
          </div>

          <div className="wrapper">
            <section className="vinylInput">
              {this.state.isActive === true && (
                <div className="stepOne">
                  <BandForm
                    bandValue={this.state.bandName}
                    setBandValue={this.handleBandValue}
                    saveBandValue={this.handleBandSubmit}
                  />
                </div>
              )}

              {this.state.bandNameCapture !== "" &&
                this.state.isActive === false && (
                  <div className="stepTwo">
                    <h3>How about an image for your vinyl sleeve?</h3>
                    <ImageForm
                      imageValue={this.state.imageSearch}
                      setImageValue={this.handleImageValue}
                      saveImageValue={this.handleImageSubmit}
                    />
                  </div>
                )}

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

            <section className="vinylOutput">
              {this.state.buttonClicked === true &&
                this.state.vinylFinal.map((item) => {
                  return (
                    <div className="vinylRecord">
                      <p>{item.band}</p>
                      <img
                        className="vinylCover"
                        src={item.image}
                        alt="Vinyl record cover"
                      />
                      <img
                        className="vinylLabel"
                        src={item.label}
                        alt="Vinyl record label"
                      />
                      <img
                        className="vinylRecord"
                        src={item.record}
                        alt="Vinyl record"
                      />
                      <button
                        className="removeButton"
                        onClick={() => {
                          this.handleVinylRemove(item.key);
                        }}
                        type="submit"
                        aria-label="click here to see your vinyl record cover"
                      >
                        <span
                          className="fa-stack fa-2x"
                          role="img"
                          aria-hidden="true"
                        >
                          <i className="fas fa-circle fa-stack-2x"></i>
                          <i className="fas fa-times fa-stack-1x fa-inverse"></i>
                        </span>
                      </button>
                    </div>
                  );
                })}
            </section>
          </div>
        </main>

        <footer>
          <p>
            Created by Kristen Delorey at{" "}
            <a href="https://junocollege.com">Juno College</a>
          </p>
          <p>Copyright {copyright} 2020 Juno College of Technology</p>
          <p class="footerSocial">
            Follow me: <a href="https://twitter.com/kdlry">Twitter</a>
            <a href="https://github.com/kdlry">Github</a>
            <a href="https://www.linkedin.com/in/kristen-delorey">LinkedIn</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
