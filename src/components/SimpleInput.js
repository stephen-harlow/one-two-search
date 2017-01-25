import React, {Component} from 'react'
import { Field } from 'redux-form'
import { Form, Input, Message } from 'semantic-ui-react';
class SimpleInput extends Component{
    constructor(props){
        super(props);
        this.state = {name: props.name, placehold: props.placehold, keyname: props.keyname}
    	this.input = this.input.bind(this);
    }
    input({input, meta: {touched, error}, ...custom}){
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
	          placeholder={this.state.placehold}
	          {...input}
	          {...custom} />
	      </div>
	    );
    }
   
    render(){
        return (
        	<Form.Field name={this.state.name}>
            	<label>{this.state.keyname}</label>
        		<Form.Input placeholder={this.state.placehold}/>
            </Form.Field>
           ) 
    }
}
export default SimpleInput;
