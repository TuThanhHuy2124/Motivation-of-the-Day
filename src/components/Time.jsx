// eslint-disable-next-line react/prop-types
function Time ({name, index}) {
    return <input name={name} id={name + "-" + index} type="time" className="time"/>
}

export default Time