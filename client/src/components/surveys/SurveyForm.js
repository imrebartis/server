// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
// Field will help us render any type of html element that collects input from users
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <Field component="input" type="text" name="SurveyTitle" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
