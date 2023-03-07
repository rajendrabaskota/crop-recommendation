
import { FirstPage } from './First_page';
import { Results } from './results';
import { InputPage } from './input_page';

import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";

const App = () => {

    return ( 
        // <div className='landingPage'>
        // <h1 > Crop Recommendation </h1>

        // <div className='formbox'>
        // <form onSubmit={handleSubmit} className='form'>
        //     <div className='each_line'>
        //         <label className='form_elements'>Phone number </label>
        //         <input type = "tel" maxLength="10" minLength="10" value= {ph_no} onChange={e => {setph_no(e.target.value)}} className='form_input' required/>
        //     </div>
            
        //     <div className='each_line'>
        //         <label className='form_elements'>N </label>
        //         <input type = 'number' value= {N}  maxLength="5" onChange={e => {setN(e.target.value)}} className='form_input' required/>
        //     </div>
        //     <div className='each_line'>
        //         <label  className='form_elements'>P </label>
        //         <input type = 'number' value= {P} maxLength="5" onChange={e => {setP(e.target.value)}} className='form_input' required/>
        //     </div>
        //     <div className='each_line'>
        //         <label  className='form_elements'>K </label>
        //         <input type = 'number' value= {K} maxLength="5" onChange={e => {setK(e.target.value)}} className='form_input' required/>
        //     </div>
        //     <div className='each_line'>
        //         <label  className='form_elements'>pH </label>
        //         <input type = 'number' value= {pH} maxLength="5" onChange={e => {setpH(e.target.value)}} className='form_input' required/>
        //     </div>
        //     <div className='each_line'>
        //         <label  className='form_elements'>rainfall </label>
        //         <input type = 'number' value= {rainfall} maxLength="5" onChange={e => {setrainfall(e.target.value)}} className='form_input' required />
        //     </div>
        //     <div >
        //     <input type="submit" value="Submit" className='submit_button'/>
        //     </div>
        // </form>
        // </div>

        <Router>
            <Routes>
                <Route exact path='/' element= {
                    <>
                        <FirstPage/>
                    </>
                }/>
                <Route exact path='/input' element= {
                    <>
                        <InputPage/>
                    </>
                }/>
                <Route exact path='/results' element= {
                    <>
                        <Results/>
                    </>
                }/>
            </Routes>
        </Router>
    )
}

export default App