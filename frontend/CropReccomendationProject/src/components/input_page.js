import React from 'react'
import { useNavigate } from "react-router-dom";
import { NodeInput } from './nodeInput.js';
import { useState } from 'react';

export const InputPage = () => {

    let nodes = [1, 2, 3];
    let navigate = useNavigate();

    const [details, setdetails] = useState(Array(nodes.length).fill({
        node : "",
        checked : true,
        N : "",
        P : "",
        K : "",
    }))

    let handleSubmit = (e) => {
        e.preventDefault();
        console.log(details);
        navigate(`/results`);

    }

  return (
    <div> 
        <h1 className='first_page_heading'>Select your nodes</h1>
        <form onSubmit={handleSubmit} className='first_form'>
            <div>
                {nodes.map( (node,i) => {return <NodeInput
                    node={node}
                    details = {details[i]}
                    setCurrentDetails = {(value) => {
                        const details_copy = [...details]
                        details_copy[i] = value;
                        details_copy[i].node = node; 
                        setdetails(details_copy)
                    }}
                />} )}
            </div>
            <div >
                <input type="submit" value="Submit" className='login_button2'/>
            </div>
        </form>
    </div>
  )
}
