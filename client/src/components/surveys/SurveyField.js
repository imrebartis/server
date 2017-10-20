// SurveyField contains logic to render a single
// label and text input
import React from 'react';

export default ({input, label}) => {
// return all the values and keys (i.e. event handlers like onChange, onBlur, etc.) that are in input
// {... input} is a shortcut for writing onBlur={input.OnBlur}, onChange={input.onChange}, etc.
  return (
    <div>
      <label>{label}</label>
      <input {... input}/>
      </div>
  );
};