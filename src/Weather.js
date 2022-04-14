import { useState } from 'react'
import RadioButton from './RadioButton'
import WeatherDisplay from './WeatherDisplay'
import './Weather.css'


function Weather() {


    const [zip, setZip] = useState('32907')
    const [unit, setUnit] = useState('f')
    const [data, setData] = useState(null)

    //---------------------------------------

    function getUnit(unit) {
        if (unit === "F") {
            return "imperial"
        } else if (unit === "C") {
            return "metric"
        } else if (unit === "K") {
            return "standard"
        };
    }

    async function fetchWeather() {
        const formalUnit = getUnit(unit)
        const weatherAPI = 'cf7abad5c3f19d56868e53ea32367477'
        const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${weatherAPI}&units=${formalUnit}`

        const response = await fetch(path)
        const json = await response.json()

        const cod = json.cod
        const message = json.message

        if (cod !== 200) {
            setData({ cod, message })
            return
        }

        const temp = Math.round(json.main.temp)
        const feelsLike = json.main.feels_like
        const description = json.weather[0].description

        setData({
            cod,
            message,
            temp,
            feelsLike,
            description
        })
    }

    //---------------------------------------


    return (
        <div className='Weather'>
            <form onSubmit={e => {
                e.preventDefault()
                fetchWeather().then()
            }}>
                {data ? <WeatherDisplay {...data} /> : <p>Enter Zip Code To Get Weather</p>}
                <div>
                    <input
                        placeholder="Enter zip code"
                        value={zip}
                        onChange={e => setZip(e.target.value)}
                    />
                    <button className="search" >
                        Submit
                    </button>
                </div>


                <select
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                >
                    <option value="F">Farenheit</option>
                    <option value="C">Celcius</option>
                    <option value="K">Kelvin</option>
                </select>

                <div className="radios">

                    <RadioButton
                        name="unit"
                        checked={unit === "F"}
                        onChange={() => setUnit("F")}
                        label="Imperial"
                    />


                    <RadioButton
                        name="unit"
                        checked={unit === "C"}
                        onChange={() => setUnit("C")}
                        label="Metric"
                    />


                    <RadioButton
                        name="unit"
                        checked={unit === "K"}
                        onChange={() => setUnit("K")}
                        label="Standard"
                    />

                </div>
            </form>
        </div>
    )
}

export default Weather;