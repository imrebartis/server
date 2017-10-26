// SurveyFormReview shows users their form inputs for review
import React from 'react';

// SurveyFormReview shows users their form inputs for review

const SurveyFormReview = ({ onCancel }) => {
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

export default SurveyFormReview;