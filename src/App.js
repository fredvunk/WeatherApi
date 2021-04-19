import React, { useState } from "react";
import "./App.css";
import { getWeather, getForecast } from "./api/api";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [degree, setDegree] = useState("");
  const [time, setTime] = useState("");
  const [weeklyArray, setWeeklyArray] = useState([]);

  const search = async (e) => {
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        const data = await getWeather(query);
        const res = await getForecast(query);

        setWeather(data);
        setWeeklyArray(res.list);
        setQuery("");

        // Source for wind degree converting: https://stackoverflow.com/questions/36475255/i-have-wind-direction-data-coming-from-openweathermap-api-and-the-data-is-repre
        // Degree convert
        const deg = data.wind.deg;
        let compassSector = [
          "N",
          "NNE",
          "NE",
          "ENE",
          "E",
          "ESE",
          "SE",
          "SSE",
          "S",
          "SSW",
          "SW",
          "WSW",
          "W",
          "WNW",
          "NW",
          "NNW",
          "N",
        ];
        const convertDegree = compassSector[(deg / 22.5).toFixed(0)];
        setDegree(convertDegree);

        // Todays date & time
        const date = new Date(Date(2020, 11, 20, 3, 23, 16, 738));
        const options = {
          weekday: "long",
          hour: "numeric",
          minute: "numeric",
        };
        const dateFormat = new Intl.DateTimeFormat("en-us", options).format(
          date
        );
        setTime(dateFormat);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header>
        <div>
          Where is <strike>Waldo</strike>
          <p className="sun">the sun</p>
        </div>
      </header>

      <form>
        <div className="inputField">
          <i className="fas fa-map-marker-alt"></i>
          <input
            className="search"
            type="search"
            placeholder="Enter Location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
      </form>

      <div className="currentLoc">
        <u>Select my current location</u>
      </div>
      {weather.main && (
        <div className="weatherData">
          <div className="weatherDataLeft">
            <img
              className="icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            ></img>
            <p>{time}</p>
          </div>
          <div className="weatherDataRight">
            <p>
              Temperature: <span>{Math.round(weather.main.temp)}</span>
            </p>
            <p>
              Wind:
              <span>
                {weather.wind.speed}m/s, {degree}
              </span>
            </p>
            <p>
              Feels like:
              <span>{Math.round(weather.main.feels_like)}&deg;C</span>
            </p>
            <p>
              Pressure: <span>{weather.main.pressure} mmHg</span>
            </p>
            <p>
              Humidity: <span>{weather.main.humidity}%</span>
            </p>
          </div>
        </div>
      )}
          <div>
            {/* Siin on valed andmed, 7 päeva asemel on daily. */}
            <div className="forecast">
              {weeklyArray.map((item, index) => {
                return (
                <div key={index} className="forecastItem">
                  <p>      
                    {new Intl.DateTimeFormat('en-us', {
                             weekday:'short'
                    }).format(item.dt)
                    }
                    </p>
                  <img
              className="icon"
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="icon"
            ></img>
                  {Math.round(item.main.temp)}&deg;C
                <p>{item.wind.speed}m/s</p>
                </div>
                )
              })}
            </div>
          </div>
    </div>
  );
}

export default App;
