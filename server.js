const express = require('express');
const request = require('request');
const cors = require('cors');
const path  = require("path");
const dotenv = require("dotenv");
const app = express();

// Enable CORS for all routes
app.use(cors());

// const __dirname = path.resolve();

app.get('/location', (req, res) => {
	let city = req.query.city;
	var request = require('request');
	request(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3f19f223eaae77727e1ff261e9962111&units=metric`,
		function(error, response, body) {
			let data = JSON.parse(body);
            let obj ={
                location: data.name,
                temperature: data.main.temp,
                temperature_min: data.main.temp_min,
                temperature_max: data.main.temp_max,
                humidity: data.main.humidity,
                pressure:data.main.pressure,
                feels_like: data.main.feels_like,
                wind_speed: data.wind.speed
              }
			if (response.statusCode === 200) {
				res.send(obj);
			}
		}
	);
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} 
else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}



app.listen(5000, () => console.log('Server started on port 5000'));