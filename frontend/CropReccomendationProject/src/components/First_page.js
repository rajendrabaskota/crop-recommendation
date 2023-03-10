import React from 'react'
import "./First_page.css"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export const FirstPage = () => {

    const [ph_no, setph_no] = useState('')

    // const [target_data, settarget_data] = useState('')

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // settarget_data(ph_no);
        console.log(ph_no);
        try {
            const response = await axios.post('http://192.168.1.69:8000/form-submit', data);
            setdata1(response.data)
            // console.log(response.data);
          } catch (error) {
            console.error(error);
          }
          setdis('block')

        navigate(`/input`);
    }

  return (
    <div id='first_page_all'>
        <h1 className='first_page_heading'>Crop Recommendation</h1>

        <form onSubmit={handleSubmit} className='first_form'>

            <div>
                <label className='first_page_ph_no'>Phone number </label>
                <input type = "text" placeholder='Your phone number' maxLength="10" minLength="10" value= {ph_no} onChange={e => {setph_no(e.target.value)}} className='form_input' required/>
            </div>

            <div className='login_div'>
                <input type="submit" value="Login" className='login_button'/>
            </div>
            
        </form>
    </div>
  )
}
