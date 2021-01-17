import React, { useState } from 'react';
import CurrentTime from './CurrentTime'
import OpenStreetMap from './OpenStreetMap'
import Footer from './Footer'

const api = {
  key: "d7a6927b014ca7837a8de4094acaeab8",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  console.log(weather)

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
               <CurrentTime/>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
           <div className='des-weather'>
               {/* <p>Feels-Like{weather.main.feels_like}</p> */}
              <div className='box1'>
                  <p>Humidity: {weather.main.humidity}</p>
                  <p>Max-Temperature: {weather.main.temp_max}°c</p>
                  <p>Min-Temperature: {weather.main.temp_min}°c</p>
              </div>
              <div className='box2'>
                  <p>Description: {weather.weather[0].main}</p>
                  <p>Wind Direction: {weather.wind.deg}°</p>
                  <p>Wind Speed: {weather.wind.speed}m/s</p>
              </div>
           </div>
          </div>
        </div>
        ) : ('')}
      </main>
      <OpenStreetMap/>
      <Footer/>
    </div>
  );
}

export default App;
