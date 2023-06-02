const express = require('express');
const request = require('request');

const app = express();

app.get('/', (req, res) => {
	let city = req.query.city;
	var request = require('request');
    // `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=4db79c80a0011b0ac1f770080f67bb2d&units=metric`
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

app.listen(5000, () => console.log('Server started on port 5000'));