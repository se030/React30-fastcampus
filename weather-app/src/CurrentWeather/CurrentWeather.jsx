import React from 'react'
import { useContext } from 'react'
import { WeatherContext } from '../WeatherProvider/WeatherProvider'
import CurrentWeatherIcon from '../CurrentWeatherIcon/CurrentWeatherIcon'

function CurrentWeather() {
    const {name, temp, weatherState} = useContext(WeatherContext);
  return (
    <div className='weather'>
        {name} &nbsp;/
        <CurrentWeatherIcon weatherState={weatherState}/>
        <span>{temp}&deg;</span>
    </div>
  )
}

export default CurrentWeather