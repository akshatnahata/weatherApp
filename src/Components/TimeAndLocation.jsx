import React from 'react'
import { FormatToLocalTime } from "../Services/WeatherService";


function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
            {FormatToLocalTime(dt, timezone)}
            {/* Friday, 11 November 2022 | Local Time: 01:15 AM  */}
        </p>
      </div>

      <div className="flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation