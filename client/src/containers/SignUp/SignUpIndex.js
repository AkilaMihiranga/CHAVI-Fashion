import React, { Component } from 'react';
import * as authActions from '../../actions/authActions';

import { Link, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/index';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            first_Name: '',
            last_Name: '',
            email: '',
            gender: '',
            contact_Name: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.signupHandler = this.signupHandler.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    signupHandler = (e) => {
        e.preventDefault();

        if(this.validateForm()){
            const user = {
                first_Name: this.state.first_Name,
                last_Name: this.state.last_Name,
                email: this.state.email,
                gender: this.state.gender,
                contact_Number: this.state.contact_Number,
                password: this.state.password
            }

            this.props.signup(user)
                .then(jsonResponse => {
                    console.log(jsonResponse);
                    this.props.history.push({
                        pathname: '/login',
                        search: '?signup=success',
                        state: jsonResponse.message
                    });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.first_Name) {
            formIsValid = false;
            errors["first_Name"] = "*Please Enter Your First Name.";
        }

        if (!this.state.last_Name) {
            formIsValid = false;
            errors["last_Name"] = "*Please Enter Your Last Name.";
        }

        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "*Please Enter Your Email";
        }

        else if (typeof this.state.email !== "undefined") {
            const pattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
            if (!pattern.test(this.state.email)) {
                formIsValid = false;
                errors["email"] = "*Please Enter Valid Email.";
            }
        }

        if (!this.state.gender) {
            formIsValid = false;
            errors["gender"] = "*Please Select Your Gender.";
        }

        if (!this.state.contact_Number) {
            formIsValid = false;
            errors["contact_Number"] = "*Please Enter Your Contact Number.";
        }

        else if (typeof this.state.contact_Number !== "undefined") {
            if (!this.state.contact_Number.match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["contact_Number"] = "*Please Enter Valid Contact Number.";
            }
        }

        if (!this.state.password) {
            formIsValid = false;
            errors["password"] = "*Please Create Password.";
        }

        else if (this.state.password.length < 6) {
            formIsValid = false;
            errors["password"] = "*Password must be 6 Characters long.";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result){
                        this.setState({
                            redirectToReferrer: true
                        });
                    }

                })
                .catch(er => {
                    console.log(er);
                });
        }
    }

    render() {

        const { redirectToReferrer }  = this.state;

        if(redirectToReferrer){
            return <Redirect to="/" />
        }

        return (
            <div>
            <Header />
            <div className="mt-5">
                <div className="col-md-4 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3"><i className="fas fa-user-plus"/> REGISTER</h1>

                        <form onSubmit={this.signupHandler} autoComplete="off">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="first_Name"
                                    value={this.state.first_Name}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter First Name"
                                />
                            </div>
                            <div style={{ fontSize:13, color: "red"}}>{this.state.errors.first_Name}</div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="last_Name"
                                    value={this.state.last_Name}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                />
                            </div>
                            <div style={{fontSize:13, color: "red"}}>{this.state.errors.last_Name}</div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div style={{fontSize:13, color: "red"}}>{this.state.errors.email}</div>
                            <div className="form-group">
                                <select className="custom-select"
                                        type="text"
                                        name="gender"
                                        value={this.state.gender}
                                        onChange={this.onChange}>

                                    <option>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div style={{fontSize:13, color: "red"}}>{this.state.errors.gender}</div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="contact_Number"
                                    value={this.contact_Number}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Contact Number"
                                />
                            </div>
                            <div style={{fontSize:13, color: "red"}}>{this.state.errors.contact_Number}</div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Create Password"
                                />
                            </div>
                            <div style={{fontSize:13, color: "red"}}>{this.state.errors.password}</div><br/>
                            <button type="submit" className="btn btn-primary btn-block">Register</button><br/>
                            <a href="/" className="btn btn-danger btn-block">Cancel</a>
                        </form>
                        <p className="lead mt-4">Have An Account? <Link style={{color: "DODGERBLUE"}} to="/login">Login</Link></p>
                    </div>
                </div>
            </div><br/><br/><br/>
           <Footer />
           </div> 
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (user) => dispatch(authActions.signup(user)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);