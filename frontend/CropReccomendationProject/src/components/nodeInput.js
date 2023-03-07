import React from 'react'
import "./nodeInput.css"

export const NodeInput = ({node, details, setCurrentDetails}) => {
    const handleCheckboxChange = (e) => {
        setCurrentDetails({...details, "checked": !details["checked"]})
    }

    const handleN = (e) => {
        setCurrentDetails({...details, "N": e.target.value})
    }

    const handleP = (e) => {
        setCurrentDetails({...details, "P": e.target.value})
    }

    const handleK = (e) => {
        setCurrentDetails({...details, "K": e.target.value})
    }
    return (
        <div className={`container1 ${ details.checked? '' : 'hidden'}`}>

            <label className='container'>{node}
                <input type="checkbox" checked={details.checked} onChange = {handleCheckboxChange}/>
                <span class="checkmark"></span>
            </label>

            <div >
                <label>N</label>
                <input type = "number" maxLength="5" placeholder='N value' disabled = {!details.checked} name = "N" onChange = {handleN} className='form_input_2'/>
            </div>

            <div >
                <label>P</label>
                <input type = "number" maxLength="5" placeholder='P value' disabled = {!details.checked} name = "P" onChange = {handleP} className='form_input_2'/>
            </div>

            <div >
                <label>K</label>
                <input type = "number" maxLength="5" placeholder='K value' disabled = {!details.checked} name = "K" onChange = {handleK} className='form_input_2'/>
            </div>
        
        </div>
    )
}
