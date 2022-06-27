import React from 'react'
import './style.css'
import CurrentWeather from './CurrentWeather/CurrentWeather'
import TempInfo from './TempInfo/TempInfo'
import ExtraInfo from './ExtraInfo/ExtraInfo'
import WeatherTab from './WeatherTab/WeatherTab'

function WeatherApp() {
  return (
    <>
    <div className='container'>
        <CurrentWeather />
        <TempInfo />
        <ExtraInfo />
        <WeatherTab />
    </div>
    </>
  )
}

export default WeatherApp