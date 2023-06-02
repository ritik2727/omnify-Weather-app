import { Box, TextField, Typography } from "@mui/material";
import "./App.css";
import { BiWind } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
import CompressIcon from "@mui/icons-material/Compress";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import axios from 'axios'
import { useState ,useEffect} from "react";
function App() {

 const [cityName,setCityName] =useState("");
 const [location,setLocation] = useState("Indore");
 const [windspeed,setwindSpeed] = useState("3.6");
 const [feels_like,setFeelLike] = useState("32.39");
 const [humidity,setHumidity] = useState("48");
 const [Pressure,setPressure] = useState("1011");
 const [maxTemp,setMaxTemp] = useState("30.1");
 const [minTemp,setMinTemp] = useState("30.1");
 const [Temp,setTemp] = useState("30.1");

//  useEffect((event) => {
//   fetchWeatherDetails(event)
//  }
//  ,[])
 const fetchWeatherDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/location?city=${cityName}`
      );
      console.log(response.data);
      setFeelLike(response.data.feels_like);
      setLocation(response.data.location);
      setHumidity(response.data.humidity);
      setTemp(response.data.temperature);
      setMinTemp(response.data.temperature_min);
      setMaxTemp(response.data.temperature_max);
      setwindSpeed(response.data.wind_speed);
      setPressure(response.data.pressure);
      // return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return (
    <div className="App">
      <header className="App-header">
      <Box component="form" onSubmit={(e)=>fetchWeatherDetails(e)}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="search location"
          style={{ color: "white" }}
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          sx={{
            "& .MuiInputBase-root": {
              color: "white",
              border: "1px solid #61dafb",
              borderRadius: 1,
            },
          }}
        />
        </Box>
        <span style={{ fontSize: 40 }}>{location}</span>
        <Typography variant="h1" style={{ color: "#61dafb" }}>
          {Temp} °c
        </Typography>
        <div>
          <span style={{ fontSize: 25 }}>Min: {minTemp}°c | Max: {maxTemp}°c</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridGap: 20,
            marginTop: 30,
          }}
        >
          <div>
            <div>
              <BiWind style={{ fontSize: 40 }} />
            </div>
            <div>Wind Speed</div>
            <span style={{ fontSize: 17, color: "#61dafb" }}>{windspeed} m/s</span>
          </div>
          <div>
            <div>
              <CompressIcon style={{ fontSize: 40 }} />
            </div>
            <div>Pressure</div>
            <span style={{ fontSize: 17, color: "#61dafb" }}>{Pressure}mbar</span>
          </div>
          <div>
            <div>
              <WiHumidity style={{ fontSize: 40 }} />
            </div>
            <div>Humidity</div>
            <span style={{ fontSize: 17, color: "#61dafb" }}>{humidity}%</span>
          </div>
          <div>
            <div>
              <ThermostatIcon style={{ fontSize: 40 }} />
            </div>
            <div>Real Feel</div>
            <span style={{ fontSize: 17, color: "#61dafb" }}>{feels_like}°c</span>
          </div>
        </div>
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React JS
        </a> */}
      </header>
    </div>
  );
}

export default App;
