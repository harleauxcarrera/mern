import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom' //will help with redirect after registering

//for css
import classnames from 'classnames'
//used for connecting redux to a component
import {connect} from 'react-redux'
//import action
import {registerUser}  from '../../actions/authActions'
class Register extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '', 
      password: '',
      password2: '',
      errors: {
      }
    }
      this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  //this method allows use to populate the component error state from redux state
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors})
    }

  }

  //detect input field changes
  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  //submit form
  onSubmit (e) {
   e.preventDefault()

   //create user once form submitted
   const newUser = {
     name: this.state.name, 
     email: this.state.email, 
     password: this.state.password,
     password2: this.state.password2
   }
   //test user is being created
   console.log(newUser);

  //make action request  to handle the submit form 
  //all component actions accessed thru this.props...
  this.props.registerUser(newUser, this.props.history);
  }

  
  render() {
  //get errors to display below input fields
  const {errors} = this.state; 
   
  
    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your DevConnector account</p>
                <form noValidate action="create-profile.html" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input 
                    type="text" 
                    className={classnames('form-control form-control-lg',{
                      //is-invalid true if name error
                      'is-invalid' : errors.name
                    })}  
                    placeholder="Name" 
                    name="name" 
                    value={this.state.name} 
                    onChange = {this.onChange}
                     />
                     {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                  </div>
                  <div className="form-group"  >
                    <input type="email"  
                    className={classnames('form-control form-control-lg',{
                      //is-invalid true if name error
                      'is-invalid' : errors.email
                    })} 
                     placeholder="Email Address" name="email"  value={this.state.email} onChange = {this.onChange} 
                     />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                  </div>
                  <div className="form-group">
                    <input 
                    type="password" 
                    className={classnames('form-control form-control-lg',{
                      //is-invalid true if name error
                      'is-invalid' : errors.password
                    })} 
                    placeholder="Password" 
                    name="password"  
                    value={this.state.password}
                    onChange = {this.onChange}
                    />
                     {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                  </div>
                  <div className="form-group">
                    <input 
                    type="password" 
                    className={classnames('form-control form-control-lg',{
                      //is-invalid true if name error
                      'is-invalid' : errors.password2
                    })}  
                    placeholder="Confirm Password" 
                    name="password2" 
                    value={this.state.password2}
                    onChange = {this.onChange}
                    />
                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                  </div>
                  <input type="submit" className="button btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//Include Required PropTypes
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//GET AUTH STATE INTO THIS COMPONENT 
const mapStateToProps = (state) => ({
  auth: state.auth, //.auth comes from index.js in reducers dir
  errors: state.errors
});
//use connect from react-redux to connect redux to components
// here we pass mapStateToProps to have access to the auth state from authreducer
// and pass the registerUser action
export  default connect(mapStateToProps, {registerUser})(withRouter(Register)); 