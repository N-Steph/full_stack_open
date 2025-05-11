import axios from 'axios'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/All'

const getCountries = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
    // axios.get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${capital}&aqi=yes`)
    //   .then(response => {
    //     setWeatherCond(response.data)
    //   })
    //   .catch(error => console.log(error))
}

const getWeatherDetails = (capital) => {
    const request = axios.get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_KEY}&q=${capital}&aqi=yes`)
    return request.then(response => response.data)
}

export default { getCountries, getWeatherDetails }