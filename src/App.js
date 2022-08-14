import { useEffect, useState } from "react";
import "./App.css";
// import { TailSpin } from "react-loader-spinner";

let initialCountriesList = [];

function App() {
  const [countriesList, setCountriesList] = useState(initialCountriesList);
  const [searchInput, setSearchInput] = useState("");
  const [showData, setShowData] = useState(false);
  // const [loaderStatus, seTloaderStatus] = useState(false);

  useEffect(() => {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
      method: "GET",
    };
    fetch(url, options)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        setCountriesList(jsonData);
      });
  }, []);

  const onChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const onClickButton = () => {
    setShowData(!showData);
    setCountriesList(
      countriesList.filter((country) => country.name.includes(searchInput))
    );
  };

  const renderCountries =
    countriesList === []
      ? null
      : countriesList.map((country) => (
          <div className="country-card col-11 col-md-5 mr-auto ml-auto d-flex flex-row">
            <img
              alt="countryImg"
              src={country.flag}
              className="country-flag mt-auto mb-auto"
            />
            <div className="d-flex flex-column ml-4">
              <p className="country-name">{country.name}</p>
              <p className="country-population">{country.population}</p>
            </div>
          </div>
        ));

  console.log(countriesList);

  return (
    <div className="container pt-5">
      <div className="row">
        <h1 className="col-12 heading text-center">
          Find the Countries Population
        </h1>
        <div className="d-flex col-12 text-center mt-3">
          <input
            id="searchInput"
            type="search"
            placeholder="Search for a Country"
            className="form-control col-10 search-input"
            onChange={onChangeInput}
            value={searchInput}
          />
          <button
            className="col-2 btn button"
            type="button"
            onClick={onClickButton}
          >
            Search
          </button>
        </div>
        {/* {(
          <div className="col-12 mt-5" id="spinner">
            <div className="d-flex flex-row justify-content-center">
              <div className="spinner-border" role="status"></div>
            </div>
          </div>
        )} */}
      </div>
      <div id="resultCountries" className="row result-countries">
        {renderCountries}
      </div>
    </div>
  );
}

export default App;
