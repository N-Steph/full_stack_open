const WeatherReport = (props) => {
    if (props.ready) {
        return (
            <div>
                <h2>Weather {props.ready.location.name}</h2>
                <p>Temperature {props.ready.current.temp_c} Celsius</p>
                <img src={props.ready.current.condition.icon} />
                <p>Wind {props.ready.current.wind_mph} m/s</p>
            </div>
        )
    }
}

export default WeatherReport