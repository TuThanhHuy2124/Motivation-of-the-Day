import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Time ({name, index, preset_time}) {
    const [value, setValue] = useState(preset_time);

    return <input name={name} 
                  id={name + "-" + index} 
                  type="time" 
                  className="time" 
                  value={value} 
                  onInput={() => setValue(null)}/>
}

export default Time;