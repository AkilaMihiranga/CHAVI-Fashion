import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as authActions from '../../actions/authActions';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/index';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
            errors: {},
            badRequestError: ''
            
        }

        this.onChange = this.onChange.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    loginHandler = (e) => {
        e.preventDefault();

        if(this.validateForm()){
            this.props.authenticate(this.state.email, this.state.password)
            .then(response => {
                console.log(response);
                if(response.hasOwnProperty('token') && response.user.userRole === 'user'){
                    window.localStorage.setItem('auth', JSON.stringify(response))
                    this.props.history.push('/');

                } else if(response.hasOwnProperty('token') && response.user.userRole === 'admin'){
                    window.localStorage.setItem('auth', JSON.stringify(response))
                    this.props.history.push('/admin-dashboard');

                }  else if(response.hasOwnProperty('token') && response.user.userRole === 'storeManager'){
                    window.localStorage.setItem('auth', JSON.stringify(response))
                    this.props.history.push('/store-manager-dashboard');
                } else {
                    const badRequest = "*Invalid Email or Password.";
                    this.setState({
                        badRequestError: badRequest
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

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

        if (!this.state.password) {
            formIsValid = false;
            errors["password"] = "*Please Create Password.";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {
        return (
            <div>
            <Header />    
            <div className="mt-5">
                <div className="col-md-4 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center mb-3"><i className="fas fa-sign-in-alt"/> LOGIN</h1>
                        <form onSubmit={this.loginHandler} autoComplete="off">
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
                                <input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    className="form-control"
                                    placeholder="Enter Password"
                                />
                            </div>
                            <div style={{fontSize:13, color: "red"}}>{this.state.errors.password}</div><br/>
                            <div style={{fontSize:13, color: "red"}}>{this.state.badRequestError}</div><br/>
                            <button type="submit" className="btn btn-primary btn-block">Login</button><br/>
                            <a href="/" className="btn btn-danger btn-block">Cancel</a>
                        </form>
                        <p className="lead mt-4">No Account? <Link style={{color: "DODGERBLUE"}} to="/signup">Register</Link></p>
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
        authenticate: (email, password) => dispatch(authActions.authenticate(email, password)),
        getToken: () => dispatch(authActions.getToken())
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);