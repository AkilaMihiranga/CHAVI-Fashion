import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as authActions from '../../actions/authActions';
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
        if (!this.props.auth.isAuthenticated){
            this.props.getToken()
            .then(result => {
                if(result){
                    this.getProfileDetails();
                }else{
                    this.props.history.push('/login');
                }
            })
        }else{
            this.getProfileDetails();
        }
    }

    getProfileDetails = () => {
        const user_id = this.props.auth.user.user_id;
        fetch(`/user/${user_id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    id: jsonResponse.data._id,
                    first_Name: jsonResponse.data.first_Name,
                    last_Name: jsonResponse.data.last_Name,
                    email: jsonResponse.data.email,
                    gender: jsonResponse.data.gender,
                    contact_Number: jsonResponse.data.contact_Number
                });
            })
            .catch(error => {
                console.log(error);
            })
    };


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
                <div style={{marginTop: '150px'}}>
                <Footer />
                </div>
            </div>           
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
};


export default  connect(mapStateToProps, mapDispatchToProps)(Profile);