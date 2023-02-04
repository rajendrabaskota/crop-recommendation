import React from "react";


const Button= ({name, counter})=> {
    
    return <div><button onClick={counter} className="button">{name}</button>
    </div>

}

export default Button;
