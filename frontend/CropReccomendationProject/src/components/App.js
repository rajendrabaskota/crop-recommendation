// import React from 'react';
// import Form from './Form';

// const App = () => {
//   return (
//     <div className='landingPage'>
//         <h1>Crop Recommendation</h1>
//       <Form />
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react'
import axios from 'axios';
import "./app.css"

const App = () => {
    
    const [N, setN] = useState(0.0)
    const [P, setP] = useState(0.0)
    const [K, setK] = useState(0.0)
    const [pH, setpH] = useState(0.0)
    const [rainfall, setrainfall] = useState(0.0)
    const [phone_no, setphone_no] = useState('')
    const[data1,setdata1] = useState('')
    const[dis, setdis] = useState('none')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            phone_no: phone_no,
            N: N,
            P: P,
            K: K,
            pH: pH,
            rainfall: rainfall
        };
        // const json = JSON.stringify(data);
        console.log(typeof data);
        console.log(data);
        try {
          const response = await axios.post('http://192.168.1.76:8000/form-submit', data);
          setdata1(response.data)
          // console.log(response.data);
        } catch (error) {
          console.error(error);
        }
        setdis('block')
    }

    // const [fsubmit, setfsubmit] = useState(0)
    // console.log(fsubmit);

    // console.log(data1)

    return ( <div className='landingPage'>
        <h1 > Crop Recommendation </h1> 

        {/* <Forminput name="nitrogen" placeholder="value"/>
        <Forminput name="PH value" placeholder='value'/>
        <Forminput name="Temperature" placeholder='Celsius'/>
        <Forminput name="Humidity " placeholder='in %'/>
        <Forminput name="Rainfall" placeholder='mm'/>
        <Button name ='Submit' counter={setfsubmit}/> */}

        <div className='formbox'>
        <form onSubmit={handleSubmit} className='form'>
            <div className='each_line'>
                <label className='form_elements'>Phone number </label>
                <input type = "text" maxLength="10" minLength="10" value= {phone_no} onChange={e => {setphone_no(e.target.value)}} className='form_input' required/>
            </div>
            
            <div className='each_line'>
                <label className='form_elements'>N </label>
                <input type = 'number' value= {N}  maxLength="5" onChange={e => {setN(e.target.value)}} className='form_input' required/>
            </div>
            <div className='each_line'>
                <label  className='form_elements'>P </label>
                <input type = 'number' value= {P} maxLength="5" onChange={e => {setP(e.target.value)}} className='form_input' required/>
            </div>
            <div className='each_line'>
                <label  className='form_elements'>K </label>
                <input type = 'number' value= {K} maxLength="5" onChange={e => {setK(e.target.value)}} className='form_input' required/>
            </div>
            <div className='each_line'>
                <label  className='form_elements'>pH </label>
                <input type = 'number' value= {pH} maxLength="5" onChange={e => {setpH(e.target.value)}} className='form_input' required/>
            </div>
            <div className='each_line'>
                <label  className='form_elements'>rainfall </label>
                <input type = 'number' value= {rainfall} maxLength="5" onChange={e => {setrainfall(e.target.value)}} className='form_input' required />
            </div>
            <div >
            <input type="submit" value="Submit" className='submit_button'/>
            </div>
            
        </form>
        </div>
        <div style={{ display:`${dis}`}} className='answer'>
             Dear {data1['name']},<br></br>
             the recommended crop is {data1['crop']}
        </div>
      </div>
    )

}

export default App
