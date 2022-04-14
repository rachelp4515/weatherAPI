import './WeatherDisplay.css'

function WeatherDisplay(props) {

    const { cod, message, temp, feelsLike, description, unit } = props

    if (cod !== 200) {
    return (
        <div className="error">
        <small className="error"><strong>{message}</strong></small>
        </div>
    )} else {
    return(
        <div className="Display">
        <h1>{temp}°</h1>
        <small>Feels Like: {feelsLike} </small>
        <p>{description}</p>
        </div>
    )
}}

export default WeatherDisplay