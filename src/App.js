import './App.css';
// import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './Components/TopButtons';
import Inputs from './Components/Inputs';
import TimeAndLocation from './Components/TimeAndLocation';
import TempAndDetail from './Components/TempAndDetail';
import Forecast from './Components/Forecast';
// import GetWeatherData from './Services/WeatherService';
import GetFormattedWeatherData from './Services/WeatherService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React,{useState,useEffect} from 'react'


function App() {

  const [query,setQuery] = useState({q: 'Indore'})
  const [units,setUnits] = useState('metric')
  const [weather,setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await GetFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TempAndDetail weather={weather} />

          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
  // const FetchWeather = async ()=>{
  //   const data= await GetFormattedWeatherData({q:'london'});
  //   // console.log(data)
  // }

  // FetchWeather();
  // return (
  //   <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-600 to-blue-700 shadow-xl shadow-grey-400">
  //     <TopButtons/>
  //     <Inputs/>

  //     <TimeAndLocation/>
  //     <TempAndDetail/>
  //     <Forecast title="hourly forecast"/>
  //     <Forecast title="daily forecast"/>
  //   </div>
  // );
}

export default App;
