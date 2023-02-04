import React, { useState } from 'react';
import axios from 'axios';
import Forminput from './Forminput';

const Form = () => {
  const [values, setValues] = useState({
    N: 0.0,
    P: 0.0,
    K: 0.0,
    ph: 0.0,
    rainfall: 0.0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.76:8000/form-submit', values);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="text" name="N" placeholder="Nitrogen" value={values.N} onChange={handleChange} />
      <input type="text" name="P" placeholder="Phosphorus" value={values.P} onChange={handleChange} />
      <input type="text" name="K" placeholder="Potassium" value={values.K} onChange={handleChange} />
      <input type="text" name="ph" placeholder="pH" value={values.ph} onChange={handleChange} />
      <input type="text" name="rainfall" placeholder="Rainfall in mm" value={values.rainfall} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Form;
