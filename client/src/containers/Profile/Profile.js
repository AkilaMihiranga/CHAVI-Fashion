import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/index';

class Profile extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            first_Name : '',
            last_Name : '',
            email : '',
            gender : '',
            contact_Number : '',
            data: {}
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/user/'+this.props.auth.user.user_id)
            .then(response => {
                console.log(response);
                this.setState({
                    id: response.data.data._id,
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

    render() {
        return (
            <div>
                <Header/>
                <div className="col-md-10 m-auto">
                    <div className="card card-body">
                        <h1 className="text-center"><b>USER PROFILE</b></h1>
                        <div className="row mt-1">
                            <div className="col-md-10 m-auto">
                                <div className="card border-primary card-body">
                                    <div className="text-center">
                                        <h5><i className="far fa-user-circle fa-6x"></i></h5>
                                        <h3><b>{this.state.first_Name}   {this.state.last_Name}</b></h3>
                                        <Link to={"/update-profile/"+this.state.id} className="btn btn-primary"><i className="fas fa-user-edit"></i>  EDIT PROFILE DETAILS</Link>&nbsp;&nbsp;
                                        <Link to={"/update-password/"+this.state.id} className="btn btn-info"><i className="fas fa-user-edit"></i>  EDIT PASSWORD</Link>
                                    </div><br/>
                                    <table className="table table-hover">
                                        <tbody>
                                            <tr>
                                                <td>First Name</td>
                                                <td>{this.state.first_Name}</td>
                                            </tr>
                                            <tr>
                                                <td>Last Name</td>
                                                <td>{this.state.last_Name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{this.state.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td>{this.state.gender}</td>
                                            </tr>
                                            <tr>
                                                <td>Contact Number</td>
                                                <td>{this.state.contact_Number}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><br/><br/><br/>
                <Footer />
            </div>           
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Profile);