import React, { useEffect, useState } from "react";
import { API_KEY } from "../api/Api_Key";
import axios from "axios";

const Weather = () => {
    const [weatherData, setWeatherData] = useState([
        {
            city: "",
            curTem: "",
            feelTem: "",
            maxTem: "",
            minTem: "",
            img: "",
        },
    ]);

    const onGeoSuccess = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        axios
            .get(url)
            .then((response) => {
                setWeatherData({
                    city: JSON.stringify(response.data.name).replaceAll(
                        '"',
                        ""
                    ),
                    curTem: JSON.stringify(response.data.main.temp),
                    feelTem: JSON.stringify(response.data.main.feels_like),
                    maxTem: JSON.stringify(response.data.main.temp_max),
                    minTem: JSON.stringify(response.data.main.temp_min),
                    img: JSON.stringify(
                        response.data.weather[0].icon
                    ).replaceAll('"', ""),
                });
            })
            .catch((error) => console.log(error));
    };

    const onGeoError = () => {
        console.log("error");
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
    }, [weatherData.curTem, weatherData.feelTem]);

    return (
        <div className="header_weather_wrapper">
            <div className="header_weather_wrapper_img">
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.img}@2x.png`}
                    alt="weather_img"
                ></img>
                <div>
                    <b>{weatherData.city}</b>
                </div>
            </div>
            <div className="header_weather_wrapper_temp">
                <div className="header_weather_wrapper_temp_curTem">
                    <b>현재 온도 : {weatherData.curTem} ℃</b>
                </div>
                <div className="header_weather_wrapper_temp_feelTem">
                    <b>체감 온도 : {weatherData.feelTem} ℃</b>
                </div>
                <div className="header_weather_wrapper_temp_minMax">
                    <div className="header_weather_wrapper_temp_minMax_min">
                        <b>최저 : {weatherData.minTem} ℃</b>
                    </div>
                    <div className="header_weather_wrapper_temp_minMax_max">
                        <b>최고 : {weatherData.maxTem} ℃</b>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;