import { useState, useEffect } from "react"
// import axios from 'axios'
import countryServices from './services/data'
import WeatherReport from './components/WeatherReport'
import Message from './components/Message'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [search, setSearch] = useState('')
  const [matches, setMatches] = useState([])
  const [countriesDetails, setCountriesDetail] = useState([])
  const [countries, setCountries] = useState([])
  const [weatherCond, setWeatherCond] = useState(null)

  useEffect(() => {
    countryServices
      .getCountries()
      .then(data => {
        setCountriesDetail(data)
        setCountries(data.map(unit => unit.name.common))
      })
      .catch(error => console.log(error))
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
    setWeatherCond(null)
  }

  const handleWeatherCondition = (capital) => {
    countryServices
      .getWeatherDetails(capital)
      .then(data => setWeatherCond(data))
      .catch(error => console.log(error))
  }

  return (
    <div>
      <form>
        find countries <input value={search} onChange={handleInputChange} />
      </form>
      <Message matches={matches} onClick={handleButtonClick} />
      <CountryDetail details={matches.length === 1 ? () => getCountryDetail(matches[0]) : null} />
      <WeatherReport ready={matches.length === 1 ? weatherCond : null} />
    </div>
  )
}

export default App
