import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Container, Form, FormGroup, Input, Button, Message } from 'semantic-ui-react';
import {Fuse} from 'fuse.js';
// import SimpleInput from './SimpleInput';
class SimpleForm extends Component {

  submit({ location }, dispatch) {
    this.handle;
    console.log(this.state);
    return new Promise((resolve, reject) => {
      dispatch({ 
        type: 'FETCH_FOOD',
        location,
        resolve,
        reject 
      });
    }).catch((error) => {
      throw new SubmissionError(error);
    });
  }
  state = { formData: {} }

  handleChange = (e, { value }) => this.setState({ value })

  handle = (e, { formData }) => {
    // e.preventDefault()
    this.setState({ formData });
    console.log(formData);
    // this.state.location = formData.location;
    // var location = formData.location;
    
  }

  render() {
        const { handleSubmit } = this.props;

    const { formData, value } = this.state
    return (
        <Form onSubmit={()=> { {handleSubmit(this.submit.bind(this))}; this.handle;}}>
            <Form.Group widths='equal'>
            <Form.Field>
                <Form.Input label="Search Location" name="location" placeholder="Location..."/>
            </Form.Field>
                <Form.Input label="Search Term" name="term" placeholder="Search..."/>
            </Form.Group>

          <br/> 
              <Container textAlign='center'>

              <Button primary type='submit'>Search</Button>
          </Container>
        </Form>
    );
  }
}

const validate = values => {
  const errors = {}
  if (!values.location || values.location.trim() === '') {
    errors.location = 'Location required'
  } 
  return errors
}


export default reduxForm({
  form: 'simple'
  // validate
})(SimpleForm)
