import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState(null)

  const weatherCache = useRef({})
  const apiKey = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setQuery(event.target.value)
    setWeather(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const capital = filteredCountries[0].capital?.[0]
      if (!capital) return

      if (weatherCache.current[capital]) {
        setWeather(weatherCache.current[capital])
        return
      }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`

      axios.get(apiUrl)
        .then(response => {
          weatherCache.current[capital] = response.data
          setWeather(response.data)
        })
        .catch(() => {
          setWeather(null)
        })
    }
  }, [filteredCountries, apiKey])

  let content = null

  if (query === '') {
    content = null
  } else if (filteredCountries.length > 10) {
    content = <p>Too many matches, please specify</p>
  } else if (filteredCountries.length > 1) {
    content = (
      <ul>
        {filteredCountries.map(country => (
          <li key={country.name.common}>
            {country.name.common}
            <button onClick={() => setQuery(country.name.common)}>Show</button>
          </li>
        ))}
      </ul>
    )
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0]
    content = (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

        {weather && (
          <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Country Finder</h2>
      <input value={query} onChange={handleChange} />
      {content}
    </div>
  )
}

export default App
