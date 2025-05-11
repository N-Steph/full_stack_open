const Message = (props) => {
    const listStyle = {
        listStyleType: 'none',
        margin: '0',
        padding: '0',
    }
    if (props.matches.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    else if (props.matches.length > 1 && props.matches.length <= 10) {
        return (
            <ul style={listStyle}>
                {props.matches.map((match, index) => <li key={index}>
                    {match}
                    <button onClick={() => props.onClick(match)}>show</button>
                </li>)}
            </ul>
        )
    }
}

export default Message