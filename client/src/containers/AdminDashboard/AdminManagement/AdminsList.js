import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/index';

const Admin = props => (
    <tr>
        <td>{props.admin.first_Name}</td>
        <td>{props.admin.last_Name}</td>
        <td>{props.admin.email}</td>
        <td>{props.admin.gender}</td>
        <td>{props.admin.contact_Number}</td>
        <td>
            <Link to={"/edit-admin/"+props.admin._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
            <a href="/admins-list" className="btn btn-danger" onClick={() => {props.deleteAdmin(props.admin._id) } }>Delete</a>
        </td>
    </tr>
)

export default class AdminsList extends Component{

    constructor(props) {
        super(props);

        this.deleteAdmin = this.deleteAdmin.bind(this);
        this.state = {admins: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/admin/')
            .then(response => {
                this.setState({
                    admins: response.data.data.filter(el => el.userRole === 'admin')
                })
            })
            .catch((error => {
                console.log(error);
            }))
    }

    deleteAdmin(id) {
        axios.delete('http://localhost:5000/admin/' +id)
            .then(res => console.log(res.data));

        this.setState({
            admins: this.state.admins.filter(el => el._id !== id)
        })
    }

    adminList() {
        return this.state.admins.map(currentAdmin => {
            return <Admin admin={currentAdmin} deleteAdmin={this.deleteAdmin} key={currentAdmin._id}/>;
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="mt-5">
                    <div className="col-md-10 m-auto">
                        <div className="card card-body">
                            <h1><a className="btn btn-primary" href="/add-admin"><i className="fa fa-plus"></i> ADD NEW ADMIN</a></h1>
                            <h1 className="text-center">ADMIN LIST</h1>
                            <div className="row mt-1">
                                <div className="col-md-12 m-auto">
                                    <div className="card border-primary card-body text-center">
                                        <table className="table table-hover">
                                            <thead>
                                            <tr className="table-primary">
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">Contact Number</th>
                                                <th colSpan="2">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.adminList()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop: '300px'}}>
                    <Footer/>
                </div>
            </div>
        );
    }
}
