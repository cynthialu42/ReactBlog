import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';// function called reduxForm is similar to the connect helper from react-redux. 
// Allows our component to communicate with the redux store
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component{
    renderTextField(field){ //field has event handlers that helps us wire up our JSX to the Field
        const { meta: { touched, error} } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        return(
            <div className = {className}>
                <label>{field.label}</label>
                <input
                    className = "form-control"
                    type='text'
                    {...field.input} // this contains value and all the properties like onChange etc
                />
                <div className = 'text-danger'>
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values){
        console.log(values);
        //think action creators
        this.props.createPost(values,() =>{
            this.props.history.push('/');
        });
    }
    render(){
        const { handleSubmit } = this.props;
        return(// redux form manages state. Not what happens after submit, so we need the onSubmit
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}> 
                <Field
                    label="Title" // create your own property, will get sent to the field argument
                    name='title'
                    component={this.renderTextField} // no () bc it's just a reference to the funciton. Field will call it
                />
                <Field
                    label = "Categories"
                    name = 'categories'
                    component={this.renderTextField}
                />
                <Field
                    label = "Post Content"
                    name = 'content'
                    component = {this.renderTextField}
                />
                <button type='submit' className = 'btn btn-info'>Submit</button>
                <Link to="/" className= "btn btn-danger">Cancel</Link>
            </form>
        )
    }
}


// validation. Called when try to submit
function validate(values){ // values is an object that contains values a user has entered in the form
    // console.log(values) => { title: 'sldfjs', categories: "", content: "ljs"}
    const errors = {}; // always do this

    // validate the inputs from the values object
    if(!values.title){
        errors.title = "Enter a title";
    }
    if(!values.categories){
        errors.categories = "Enter a category";
    }
    if(!values.content){
        errors.content = "Enter some content";
    }
    // if errors is empty, no problems on form. good to submit. 
    return errors;
}
export default reduxForm({
    validate,
    form: 'PostsNewForm' // the form property is the name of the form. Handy if we want multiple forms on a page
})(
    connect(null,{ createPost })(PostNew)
); 