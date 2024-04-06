// eslint-disable-next-line react/prop-types
function Time ({name, index}) {

    return (
        <>
            <input name={name} id={name + "-" + index} type="number" className="hour" min="0" max="23"/>{" : "}
            <input name={name} id={name + "-" + index} type="number" className="minute" min="0" max="59"/>
        </>
    )

}

export default Time