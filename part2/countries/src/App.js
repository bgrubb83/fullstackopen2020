import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Country(props) {
  return <p>{props.country.name}</p>
}

function CountryDetail(props) {
  return (
    <>
      <h1>{props.country.name}</h1>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h2>Languages</h2>
      <ul>
        {props.country.languages.map(language => <li>{language.name}</li>)}
      </ul>
      <img height={100} src={props.country.flag} alt={`flag of ${props.country.name}`} />
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
      return country.name.toLowerCase().includes(filter);
    });
    setMatches(matchesFound);
  }, [countries, filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
            matches.map(match => <Country country={match} key={match.name} />)
          )}
      </div>
    </form>
  );
}

export default App;
