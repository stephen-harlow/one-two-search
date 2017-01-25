import React, { Component } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { Input, Button, Message } from 'semantic-ui-react';
import {  Checkbox, Form, Radio, Select, TextArea } from 'semantic-ui-react'

const genders = [
  { text: 'Male', value: 'male' },
  { text: 'Female', value: 'female' },
]

const products = [
  { text: 'Hat', value: 'hat' },
  { text: 'Scarf', value: 'scarf' },
  { text: 'Jacket', value: 'jacket' },
  { text: 'T-Shirt', value: 't_shirt' },
  { text: 'Gloves', value: 'gloves' },
  { text: 'Watch', value: 'watch' },
  { text: 'Belt', value: 'belt' },
  { text: 'Pants', value: 'pants' },
  { text: 'Shoes', value: 'shoes' },
  { text: 'Socks', value: 'socks' },
]
class ComplexForm extends Component {
state = { formData: {} }
  adv = false
  handleChange = (e, { value }) => this.setState({ value })

  handleSubmit = (e, { formData }) => {
    e.preventDefault()
    this.setState({ formData })
    this.runner({formData}, this.props.dispatch);
  }
  // onFulfilled: (response) => { 
  //       // do something when the promise is fulfilled, e.g., update the path
  //     },
  //     onRejected: (error) => {
  //       // do something when the promise is rejected
  //     }
  // handleSubmit = (e, { formData }) => {
  //   e.preventDefault()
  //   this.setState({ formData })
  //   console.log(this);
  //   this.runner({formData}, this.props.dispatch)
  //   // const { handle } = this.props;
  //   //this.submit.bind(this);
    
  //   // this.runner.bind(this);
  //   // this.runner(this.props);
  // }
  
  runner({formData}, dispatch){
    // e.preventDefault();
    // this.setState({ formData })
    console.log({formData})
    const dat = {formData};
    // const dispatch = this.props.dispatch;
    return new Promise((resolve, reject) => {
      dispatch({ 
        type: 'FETCH_FOOD', 
        formData,
        resolve,
        reject
      });
    }).catch((error) => {
      throw new SubmissionError(error);
    });
      this.forceUpdate()

  }
  ClicktoSwitch = (e, { formData }) => {
        e.preventDefault()

    this.adv = !this.adv;
  this.forceUpdate()
  }
  render() {
    // const { handleSubmit } = this.props;
    const { formData, value } = this.state

    return (
      <div>
          <Button onClick={this.ClicktoSwitch}>{ this.adv ? "Advanced":"Simple"}</Button>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal' inline>
              <Form.Input label='Location' name='name' placeholder='Location' inline required/>
              <Form.Input label='Search Term' name='term' placeholder='Search Term' inline/>

            </Form.Group>
             { this.adv ? (
              <div>
              <Form.Input label='# of Results' name='limit' placeholder='(Default is 40)' inline/>

              <Form.Select label='Products' name='products' options={products} placeholder='Search...' search multiple />
              <Form.Group widths='2'>
                <Form.Field>
                  <label>Plan</label>
                  <Form.Group inline>
                    <Form.Radio label='A' name='plan' value='a' checked={value === 'a'} onChange={this.handleChange} />
                    <Form.Radio label='B' name='plan' value='b' checked={value === 'b'} onChange={this.handleChange} />
                    <Form.Radio label='C' name='plan' value='c' checked={value === 'c'} onChange={this.handleChange} />
                  </Form.Group>
                </Form.Field>
                <Form.Field>
                  <label>Shipping Options</label>
                  <Form.Group inline>
                    <Form.Checkbox label='Expedite' name='shippingOptions' value='expedite' />
                    <Form.Checkbox label='Gift Wrap' name='shippingOptions' value='giftWrap' />
                    <Form.Checkbox label='C.O.D.' name='shippingOptions' value='cod' />
                  </Form.Group>
                </Form.Field>
              </Form.Group>
              <Form.TextArea name='details' label='Details' placeholder='Anything else we should know?' rows='3' />
              <Form.Checkbox name='terms' label='I agree to the Terms and Conditions' />
              </div>) :null}
                          <Button primary type='submit'>Submit</Button>
            <Message>
              <pre>formData: {JSON.stringify(formData, null, 2)}</pre>
            </Message>
          </Form>
      </div>
    )
  }
  /*
  locationInput({ input, meta: { touched, error }, ...custom }) {
    const hasError = touched && error !== undefined;
    return (
      <div>
        {hasError &&
          <Message
            error
            header='Error'
            content={error} />
        }
        <Input 
          error={hasError}
          fluid 
          placeholder="Location..."
          {...input}
          {...custom} />
      </div>
    );
  }

  submit({ location }, dispatch) {
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


  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field name="location" component={this.locationInput} /> 
        <br/> 
        <Button fluid type="submit">Submit</Button>
      </form>
    );
  }
  */
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
})(ComplexForm)
