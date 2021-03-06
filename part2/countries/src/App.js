import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Country({ country, showCountry }) {
  return (
    <div>
      {country.name}
      <button onClick={event => showCountry(event, country.name)}>show</button>
    </div>
  )
}

function Weather({ weather }) {
  return (
    <>
      <p>temperature: {weather.temperature} Celcius</p>
      <img
        height={100}
        src={weather.weather_icons ? weather.weather_icons[0] : null}
        alt={weather.weather_descriptions ? weather.weather_descriptions[0] : null}
      />
      <p>wind: {weather.wind_speed} kph direction {weather.wind_dir}</p>
    </>
  )
}

function CountryDetail({ country, weather, setWeather }) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const city = country.capital;
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [city, setWeather])

  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img height={100} src={country.flag} alt={`flag of ${country.name}`} />
      <h2>Weather in {country.capital}</h2>
      <Weather weather={weather} />
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [matches, setMatches] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const matchesFound = countries.filter(country => {
      return country.name.toLowerCase().includes(filter.toLowerCase());
    });
    setMatches(matchesFound);
  }, [countries, filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const showCountry = (event, countryName) => {
    setFilter(countryName)
  }

  return (
    <form onSubmit={(event) => { event.preventDefault() }}>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <div>
        {matches.length === 1 ?
          <CountryDetail
            country={matches[0]}
            weather={weather}
            setWeather={setWeather}
          />
          :
          (matches.length > 10 ?
            'Too many matches, specify another filter'
            :
            matches.map(match => {
              return <Country
                country={match}
                key={match.name}
                showCountry={showCountry}
              />
            })
          )}
      </div>
    </form>
  );
}

export default App;
