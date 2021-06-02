import React, { useEffect, useState } from "react";
import { getMeasurements } from '../services/service';
import "../App.css";

function Temperature() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState();

  useEffect(() => {
    getMeasurements().then(resp => {
      const { data } = resp;
      const lastTemp = data['hydra:totalItems']
      setTemperature(data['hydra:member'][lastTemp - 1].temperatureC)
      setHumidity(data['hydra:member'][lastTemp - 1].humidity)
    })
  }, [])

  if(temperature === 0) {
    return <div className="lds-dual-ring"></div>
  }

  return (
    <div className="App">
      <div className="grid">
          <div className={temperature > 20 ? "card--weather sunny-day" : "card--weather snow-day"}>
          <div className="bg--illustration">
            <div className={temperature > 20 ? "sun" : "moutains"}></div>
            {temperature < 20 && <div className="foreground-mountain"></div>}
          </div>
          <div className={temperature > 20 ? "weather--indicator sun-indicator" : "weather--indicator snow-indicator"}>{Math.trunc(temperature)}º</div>
          <div className={temperature > 20 ? "humidity--indicator sun-indicator" : "humidity--indicator snow-indicator"}>{Math.trunc(humidity)}%</div>
        </div>
      </div>
      <button onClick={() => window.location.replace('/')}>Retour a l'accueil</button>
    </div>
  );
}
          

export default Temperature;
