import React from 'react'

const Forminput=(props)=> { 
  return (
    <div className='formInput'>
        <label >{props.name}  </label>
        <input placeholder={props.placeholder}/>
    </div>
  )
}

export default Forminput
