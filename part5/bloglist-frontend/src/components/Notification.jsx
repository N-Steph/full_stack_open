const Notification = ({ message, status }) => {
    const genericStyle = {
        borderRadius: "10px",
        borderStyle: "solid",
        paddingLeft: "10px"
    }
    const notificationSuccess = {
        ...genericStyle,
        borderColor: "green",
        color: "green",
    }
    const notificationError = {
        ...genericStyle,
        borderColor: "red",
        color: "red",
    }
    if (!message) {
        return
    } 
    return (
        <div style={status === 1 
        ? notificationError 
        : notificationSuccess}>
            <p>{message}</p>
        </div>
    )
}

export default Notification