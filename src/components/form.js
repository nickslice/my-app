import React from 'react';

const Form = (props) => (
    <form onSubmit={props.weatherMethod}>
        <input className="input" type='text' name='city' placeholder='City' />
        <button className="btn">Get Weather!</button>
    </form>
);
export default Form;