import { useState, useEffect } from "react"
import axios from 'axios'

const WeatherReport = (props) => {
  if (props.ready) {
    return (
      <div>
        <h2>Weather {props.ready.location.name}</h2>
        <p>Temperature {props.ready.current.temp_c} Celsius</p>
        <img src={props.ready.current.condition.icon} />
        <p>Wind {props.ready.current.wind_mph} m/s</p>
      </div>
    )
  }
}

const CountryDetail = (props) => {
  if (!props.details) {
    return
  }
  const details = props.details()
  return (
    <div>
      <h1>{details.name.common}</h1>
      <p>Capital {details.capital}</p>
      <p>Area {details.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(details.languages).map(([key, value]) => <li key={key}>{value}</li>)}
      </ul>
      <img src={details.flags.png} />
    </div>
  )
}

const Message = (props) => {
  const listStyle = {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
  }
  if (props.matches.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (props.matches.length > 1 && props.matches.length <= 10) {
    return (
      <ul style={listStyle}>
        {props.matches.map((match, index) => <li key={index}>
          {match}
          <button onClick={() => props.onClick(match)}>show</button>
        </li>)}
      </ul>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [matches, setMatches] = useState([])
  const [countriesDetails, setCountriesDetail] = useState([])
  const [countries, setCountries] = useState([])
  const [weatherCond, setWeatherCond] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/All')
      .then(response => {
        const result = response.data
        setCountriesDetail(result)
        setCountries(result.map(unit => unit.name.common))
      })
      .catch(error => {
        console.log(error)
      })

  }, [])

  const findMatches = (searchTerm) => {
    if (searchTerm.length !== 0) {
      const newMatches = countries.filter(country => {
        if (country.toLowerCase().includes(searchTerm.toLowerCase())) {
          return country
        }
      })
      setMatches(newMatches)
      if (matches.length > 1) {
        setWeatherCond(null)  
      }   
    }
    else {
      setMatches([])
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value
    findMatches(value)
    setSearch(value)
  }

  const getCountryDetail = (countryName) => {
    const countryDetail = countriesDetails.filter(country => country.name.common.toLowerCase() === countryName.toLowerCase())
    if (!weatherCond) {
      handleWeatherCondition(countryDetail[0].capital[0])
    }
    return countryDetail[0]
  }

  const handleButtonClick = (countryName) => {
    setMatches([countryName])
  }

  const handleWeatherCondition =  (capital) => {
      axios.get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${capital}&aqi=yes`)
      .then(response => {
        setWeatherCond(response.data)
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <form>
        find countries <input value={search} onChange={handleInputChange} />
      </form>
      <Message matches={matches} onClick={handleButtonClick} />
      <CountryDetail details={matches.length === 1 ? () => getCountryDetail(matches[0]) : null} />
      <WeatherReport ready={matches.length === 1? weatherCond: null} />
    </div>
  )
}

export default App
