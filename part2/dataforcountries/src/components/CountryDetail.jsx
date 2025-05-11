const CountryDetail = (props) => {
    if (!props.details) {
        return
    }
    const details = props.details()
    return (
        <div>
            <h1>{details.name.common}</h1>
            <p>Capital {details.capital}</p>
            <p>Area {details.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(details.languages).map(([key, value]) => <li key={key}>{value}</li>)}
            </ul>
            <img src={details.flags.png} />
        </div>
    )
}

export default CountryDetail