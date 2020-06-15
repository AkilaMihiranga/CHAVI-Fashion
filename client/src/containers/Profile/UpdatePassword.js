import React, {Component} from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/index';

export default class UpdatePassword extends Component {

    constructor(props) {
        super(props);

        this.onChangeCurrentPassword = this.onChangeCurrentPassword.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.onChangeReEnterPassword = this.onChangeReEnterPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            password: '',
            newPassword: '',
            reEnterPassword: '',
            NotMatchedError: '',
            errors: {},
            success: '',
            currentPassNotMatchError: ''
        }
    }

    onChangeCurrentPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        });
    }

    onChangeReEnterPassword(e) {
        this.setState({
            reEnterPassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.validateForm()){
            const updatePassword = {
                password: this.state.password,
                newPassword: this.state.newPassword
            }
    
            axios.post('http://localhost:5000/user/update-password/'+this.props.match.params.id, updatePassword)
                .then(res => {
                    console.log(res.data);
                    const successMsg = "Pofile Details Successfully Updated.!";
                    this.setState({
                        success: successMsg
                    });
                })
                .catch(() => {
                    console.log('Error');
                    const currentNotMatchMsg = "*Current Password doesn't match";
                    this.setState({
                        currentPassNotMatchError: currentNotMatchMsg
                    });
                });
                this.setState({
                    NotMatchedError: '',
                    currentPassNotMatchError: '',
                    success: ''
                });    
        }

    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.password) {
            formIsValid = false;
            errors["password"] = "*Please Enter Current Password.";
        }

        if (!this.state.newPassword) {
            formIsValid = false;
            errors["newPassword"] = "*Please Enter New Password.";
        }

        if (!this.state.reEnterPassword) {
            formIsValid = false;
            errors["reEnterPassword"] = "*Please Re-Enter New Password";
        }

        if (this.state.newPassword !== this.state.reEnterPassword) {
            formIsValid = false;
            errors["NotMatchedError"] = "*New Password and Re-Enter Password dosen't match";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="mt-5">
                    <div className="col-md-4 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">UPDATE PASSWORD</h1>

                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangeCurrentPassword}
                                        className="form-control"
                                        placeholder="Enter Current Password"
                                    />
                                </div>
                                <div style={{fontSize:13, color: "red"}}>{this.state.errors.password}</div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={this.state.newPassword}
                                        onChange={this.onChangeNewPassword}
                                        className="form-control"
                                        placeholder="Enter New Password"
                                    />
                                </div>
                                <div style={{fontSize:13, color: "red"}}>{this.state.errors.newPassword}</div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        name="reEnterPassword"
                                        value={this.state.reEnterPassword}
                                        onChange={this.onChangeReEnterPassword}
                                        className="form-control"
                                        placeholder="Re-Enter New Password"
                                    />
                                </div>
                                <div style={{fontSize:13, color: "red"}}>{this.state.errors.reEnterPassword}</div>
                                <div style={{fontSize:15, textAlign: "center", color: "red"}}>{this.state.errors.NotMatchedError}</div>
                                <div style={{fontSize:15, textAlign: "center", color: "red"}}>{this.state.currentPassNotMatchError}</div>
                                <div style={{fontSize:15, textAlign: "center", color: "green"}}>{this.state.success}</div>
                                <br/><button type="submit" className="btn btn-primary btn-block">Update Password</button><br/>
                                <a href="/" className="btn btn-danger btn-block">Cancel</a>
                            </form>
                        </div>
                    </div>
                </div><br/><br/><br/>
                <Footer />
            </div>   
        );
    }
}
