// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
   if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

  return (
      <SurveyForm
      onSurveySubmit={() => this.setState({ showFormReview: true })}/>
    );
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

// if SurveyNew is
// unmounted, clear the values from
// SurveyForm and SurveyFormReview
// (meaning if u cancel the form
// you were editing, u can add
// a new form that doesn't contain
// the values from the cancelled form):
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
