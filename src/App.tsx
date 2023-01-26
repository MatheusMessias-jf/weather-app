import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./App.module.css";

interface dataProps {
  name: String;
  temp: number;
}

export function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=6a92517b877023e1434c99a8fbf44d2b`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.search}>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.location}>
            <p>{data.name}</p>
          </div>
          <div className={styles.temp}>
            {data.main ? <h1>{data.main.temp.toFixed(1)}ºC</h1> : null}
          </div>
          <div className={styles.description}>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className={styles.botton}>
            <div className={styles.feels}>
              {data.main ? (
                <p className={styles.bold}>
                  {data.main.feels_like.toFixed(1)}ºC
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className={styles.humidity}>
              {data.main ? (
                <p className={styles.bold}>{data.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className={styles.wind}>
              {data.wind ? (
                <p className={styles.bold}>{data.wind.speed} M/S</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
