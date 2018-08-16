import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"; //will help with redirect after registering
import TextFieldGroup from "../common/TextFieldGroup";

//used for connecting redux to a component
import { connect } from "react-redux";
//import action
import { registerUser } from "../../actions/authActions";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //redirect to
      this.props.history.push("/dashboard");
    }
  }

  //this method allows use to populate the component error state from redux state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  //detect input field changes
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //submit form
  onSubmit(e) {
    e.preventDefault();

    //create user once form submitted
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    //test user is being created
    console.log(newUser);

    //make action request  to handle the submit form
    //all component actions accessed thru this.props...
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    //get errors to display below input fields
    const { errors } = this.state;

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your account</p>
                <form
                  noValidate
                  action="create-profile.html"
                  onSubmit={this.onSubmit}
                >
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info="This site uses Gravatar so use that for a profile image"
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  <input
                    type="submit"
                    className="button btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//Include Required PropTypes
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//GET AUTH STATE INTO THIS COMPONENT
const mapStateToProps = state => ({
  auth: state.auth, //.auth comes from index.js in reducers dir
  errors: state.errors
});
//use connect from react-redux to connect redux to components
// here we pass mapStateToProps to have access to the auth state from authreducer
// and pass the registerUser action
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
