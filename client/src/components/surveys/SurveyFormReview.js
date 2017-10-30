// SurveyFormReview shows users their form inputs for review
// import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

// SurveyFormReview shows users their form inputs for review

const SurveyFormReview = ({ onCancel, formValues }) => {
    return (
      <div>
        <h5>Please confirm your entries</h5>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
      </div>
    );
  };

  function mapStateToProps(state) {
    console.log(state)
    return { formValues: state.form.surveyForm.values };
  } 
  
  export default connect(mapStateToProps)(SurveyFormReview);
  