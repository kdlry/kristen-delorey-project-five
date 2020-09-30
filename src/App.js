import React, { Component } from 'react';

// Packages -----------------------
import axios from 'axios';
import Swal from 'sweetalert2';
import firebase from './Components/firebase';

// Components -----------------------
import BandForm from './Components/BandForm';
import ImageForm from './Components/ImageForm';
import ImageSelection from './Components/ImageSelection';
import StagingArea from './Components/StagingArea';
import './App.css';


class App extends Component {
  // Setting properties on state object -----------------------
  constructor() {
    super();
    this.state = {
      isActive: true,
      bandName: '',
      bandNameCapture: '',
      imageSearch: '',
      imageResults: [],
      finalImageCapture: '',
      buttonClicked: false,
      vinylFinal: [],
    };
  }

  // Pulling object data (vinyl info) from Firebase -----------------------
  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const newVinylFinal = [];
      const data = response.val();

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
    });
  }

  // Hide components / elements on render -----------------------
  handleHide = () => {
    this.setState({
      isActive: false,
    });
  };

  // BandForm Component - Input + submit handling -----------------------
  handleBandValue = (e) => {
    this.setState({
      bandName: e.target.value,
    });
  };

  handleBandSubmit = (e) => {
    e.preventDefault();

    // Error message for empty input string ---------
    if (this.state.bandName === '') {
      Swal.fire({
        title: 'Missing info',
        text: 'You need a band name to start.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });

    } else {
      // Capture value and reset input ---------
      this.setState({ bandNameCapture: this.state.bandName }, () => {
        this.setState({
          bandName: '',
        });
      });

      // Hide component for conditional rendering below ---------
      this.handleHide();
    }
  };

  // ImageForm Component - Input + submit handling -----------------------
  handleImageValue = (e) => {
    this.setState({
      imageSearch: e.target.value,
    });
  };

  handleImageSubmit = (e) => {
    e.preventDefault();

    // API call using keyword searched ---------
    const apiAuth = '563492ad6f917000010000012aa97dcd697246f8b109b93cf6e01222';
    const apiURL = 'https://api.pexels.com/v1/search';

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
      // Successful reply from API ---------
      .then((res) => {
        let apiResults = res.data.photos;

        // Error message for no results found ---------
        if (res.data.total_results === 0) {
          Swal.fire({
            title: 'No results',
            text: 'Try another keyword.',
            icon: 'warning',
            confirmButtonText: 'Okay.',
          });

        } else {
          // Capture results and reset input ---------
          this.setState({
            imageResults: apiResults,
            imageSearch: "",
          });
        }
      })

      // Unsuccessful reply from API ---------
      .catch(() => {

        // Error message for empty string ---------
        Swal.fire({
          title: 'Missing info',
          text: 'Looks like the input field is empty... try addind a keyword.',
          icon: 'error',
          confirmButtonText: 'Got it!',
        });
      });
  };

  // Reset button handling -----------------------
  handleReset = () => {

    // Warning message for page refresh ---------
    Swal.fire({
      title: 'Are you sure you want to start over?',
      text: 'This action will reload the page and clear all inputs.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {

      // If denied, close modal
      if (result.isDenied) {

      // If confirmed, refresh page and clear inputs
      } else if (result.isConfirmed) {
        document.location.reload();
      }
    });
  };

  // ImageSelection Component - Input + submit handling -----------------------
  handleKeep = (finalImage) => {
    const imageList = [...this.state.imageResults];

    const updatedList = imageList.filter((_, index) => {
      return finalImage === index;
    });

    const selectedImage = updatedList[0].src.medium;

    // Capture selected image ---------
    this.setState({
      imageResults: updatedList,
      finalImageCapture: selectedImage,
    });
  };

  // StagingArea Component - Submit handling -----------------------
  handleVinylRender = () => {

    // Create object to store in Firebase ---------
    const { bandNameCapture: band, finalImageCapture: image } = this.state;
    const vinyl = {
      band,
      image,
      record: 'https://drive.google.com/uc?export=view&id=1jx-571vPoGr3N79uBbkVazJv107Qxisv',
      label: 'https://drive.google.com/uc?export=view&id=1BK9JMkP6zPkG993koRQ6kQn6pwrfE-Lu',
    };

    const dbRef = firebase.database().ref();

    // Pushing object data (vinyl info) to Firebase ---------
    dbRef.push(vinyl);

    // Capture button click event for conditional rendering below ---------
    this.setState({
      buttonClicked: true,
    });
  };

  // Remove vinyl from Firebase -----------------------
  handleVinylRemove = (vinylKey) => {
    const dbRef = firebase.database().ref();

    dbRef.child(vinylKey).remove();
  };

  // Render elements and components -----------------------
  render() {

    // Copyright for footer ---------
    const copyright = "\u00A9";

    return (
      <div className="App">

        {/* Header ------------- */}
        <header>
          <div className="wrapper">
            <h1>
              <span className="slanted">Vinyl Resting Place</span>
            </h1>
            <h2>The Vinyl Cover Creator</h2>
          </div>
        </header>

        {/* Main ------------- */}
        <main>

          {/* Reset button ------ */}
          <div className="resetContainer">
            <button
              className="resetButton"
              type="reset"
              onClick={this.handleReset}>start over
            </button>
          </div>

          <div className="wrapper">

            {/* Form inputs and results section ------ */}
            <section className="vinylInput">
              
              {/* BandForm Component------ */}
              {this.state.isActive === true && (
                <div className="stepOne">
                  <BandForm
                    bandValue={this.state.bandName}
                    setBandValue={this.handleBandValue}
                    saveBandValue={this.handleBandSubmit}
                  />
                </div>
              )}

              {/* ImageForm Component ------ */}
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

              {/* ImageResults Component ------ */}
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

              {/* Final image capture ------ */}
              {this.state.bandNameCapture !== "" && this.state.finalImageCapture !== "" && (
                <StagingArea createVinyl={this.handleVinylRender} />
              )}

            </section>
            
            {/* Vinyl outputs section ------ */}
            <section className="vinylOutput">

              {/* Vinyl objects pulled from Firebase ------ */}
              {this.state.buttonClicked === true && this.state.vinylFinal.map((item) => {
                  return (
                    <div className="vinylRecord" key={item.key}>
                      <p>{item.band}</p>
                      <img className="vinylCover" src={item.image} alt="Vinyl record cover" />
                      <img className="vinylLabel" src={item.label} alt="Vinyl record label" />
                      <img className="vinylRecord" src={item.record} alt="Vinyl record" />
                      <button 
                        className="removeButton"
                        type="submit"
                        aria-label="click here to see your vinyl record cover"
                        onClick={() => {this.handleVinylRemove(item.key);}}>
                          <span className="fa-stack fa-2x" role="img" aria-hidden="true" >
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

        {/* Footer ------------- */}
        <footer>
          <p> 
            Created by Kristen Delorey at <a href="https://junocollege.com">Juno College</a>
          </p>
          <p>Copyright {copyright} 2020 Juno College of Technology</p>
          
          {/* Social media ------ */}
          <p className="footerSocial">
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
