import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Country({country, showCountry}) {
  return (
    <div>
      {country.name}
      <button onClick={event => showCountry(event, country.name)}>show</button>
    </div>
  )
}

function CountryDetail({country}) {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img height={100} src={country.flag} alt={`flag of ${country.name}`} />
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [matches, setMatches] = useState([]);

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
          <CountryDetail country={matches[0]} />
          :
          (matches.length > 10 ?
            'Too many matches, specify another filter'
            :
            matches.map(match => <Country country={match} key={match.name} showCountry={showCountry} />)
          )}
      </div>
    </form>
  );
}

export default App;
