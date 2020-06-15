import React, {Component} from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/index';

export default class EditUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            first_Name: '',
            last_Name: '',
            email: '',
            gender: '',
            contact_Number: '',
            errors: {}
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/user/'+this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    first_Name: response.data.data.first_Name,
                    last_Name: response.data.data.last_Name,
                    email: response.data.data.email,
                    gender: response.data.data.gender,
                    contact_Number: response.data.data.contact_Number
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeFirstName(e) {
        this.setState({
            first_Name: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            last_Name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeContactNumber(e) {
        this.setState({
            contact_Number: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.validateForm()){
            const user = {
                first_Name: this.state.first_Name,
                last_Name: this.state.last_Name,
                email: this.state.email,
                gender: this.state.gender,
                contact_Number: this.state.contact_Number
            }
    
            console.log(user);
    
            axios.post('http://localhost:5000/user/update/'+this.props.match.params.id, user)
                .then(res => console.log(res.data));
    
            window.location = '/users-list';
        }
    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

        if (!this.state.first_Name) {
            formIsValid = false;
            errors["first_Name"] = "*Please Enter First Name.";
        }

        if (!this.state.last_Name) {
            formIsValid = false;
            errors["last_Name"] = "*Please Enter Last Name.";
        }

        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "*Please Enter Email";
        }

        else if (typeof this.state.email !== "undefined") {
            const pattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
            if (!pattern.test(this.state.email)) {
                formIsValid = false;
                errors["email"] = "*Please Enter Valid Email.";
            }
        }

        if (!this.state.gender || this.state.gender === 'Select Gender') {
            formIsValid = false;
            errors["gender"] = "*Please Select Gender.";
        }

        if (!this.state.contact_Number) {
            formIsValid = false;
            errors["contact_Number"] = "*Please Enter Contact Number.";
        }

        else if (typeof this.state.contact_Number !== "undefined") {
            if (!this.state.contact_Number.match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["contact_Number"] = "*Please Enter Valid Contact Number.";
            }
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
                <div className="row mt-5">
                    <div className="col-md-4 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">UPDATE USER</h1>

                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="first_Name"
                                        value={this.state.first_Name}
                                        onChange={this.onChangeFirstName}
                                        className="form-control"
                                        placeholder="Enter First Name"
                                    />
                                </div>
                                <div style={{fontSize:13, color: "red"}}>{this.state.errors.first_Name}</div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="last_Name"
                                        value={this.state.last_Name}
                                        onChange={this.onChangeLastName}
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
                                        onChange={this.onChangeEmail}
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
                                            onChange={this.onChangeGender}>

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
                                        value={this.state.contact_Number}
                                        onChange={this.onChangeContactNumber}
                                        className="form-control"
                                        placeholder="Enter Contact Number"
                                    />
                                </div>
                                <div style={{fontSize:13, color: "red"}}>{this.state.errors.contact_Number}</div><br/>
                                <button type="submit" className="btn btn-primary btn-block">Update User</button><br/>
                                <a href="/users-list" className="btn btn-danger btn-block">Cancel</a>
                            </form>
                        </div>
                    </div>
                </div><br/><br/><br/>
                <Footer />
            </div>   
        );
    }
}
