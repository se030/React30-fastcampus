import React, { createContext, useState, useEffect } from 'react'
export const WeatherContext = createContext({})
function WeatherProvider({children}) {
    let city = "seoul";

    // update state and convey it to Provider on data load
    const [ weatherInfo, setweatherInfo ] = useState({});
    const getWeatherInfo = async() => {
        try {
            // https://web.postman.co/
            const currentWeatherInfoAPI = `https://api.openweathermap.org/data/2.5/weather?appid=c85dc6f46d7bcc2d8807e279332d20fc&q=${city}&units=metric`;
            const currentWeatherInfo = await fetch(currentWeatherInfoAPI);
            const { name, coord:{lat, lon},
                main:{temp, humidity, feels_like, temp_min, temp_max}, 
                sys:{sunset, sunrise},
                weather:[{main:weatherState}],
                wind:{speed, deg}
            } = await currentWeatherInfo.json();

            const hourlyWeatherInfoAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&appid=c85dc6f46d7bcc2d8807e279332d20fc&units=metric`;
            const hourlyWeatherInfo = await fetch(hourlyWeatherInfoAPI);
            const {hourly} = await hourlyWeatherInfo.json();

            setweatherInfo({
                name, temp, humidity, weatherState, feels_like, speed, deg, hourly, sunset, sunrise, temp_max, temp_min
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
      getWeatherInfo();
    }, [])

  return (
    <WeatherContext.Provider value={{...weatherInfo}}>
        {children}
    </WeatherContext.Provider>
  )
}

export default WeatherProvider