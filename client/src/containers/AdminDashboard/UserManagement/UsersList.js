import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/index';

const User = props => (
    <tr>
        <td>{props.user.first_Name}</td>
        <td>{props.user.last_Name}</td>
        <td>{props.user.email}</td>
        <td>{props.user.gender}</td>
        <td>{props.user.contact_Number}</td>
        <td>
            <Link to={"/edit-user/"+props.user._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
            <a href="/users-list" className="btn btn-danger" onClick={() => {props.deleteUser(props.user._id) } }>Delete</a>
        </td>
    </tr>
)

export default class UsersList extends Component{

    constructor(props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this);
        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/user/')
            .then(response => {
                this.setState({
                    users: response.data.data.filter(el => el.userRole === 'user')
                })
            })
            .catch((error => {
                console.log(error);
            }))
    }

    deleteUser(id) {
        axios.delete('http://localhost:5000/user/' +id)
            .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        })
    }

    userList() {
        return this.state.users.map(currentUser => {
            return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser._id}/>;
        })
    }

    render() {
        return (
            
            <div>
                <Header/>
                <div className="mt-5">
                    <div className="col-md-10 m-auto">
                        <div className="card card-body text-center">
                            <h1>USERS LIST</h1>
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
                                            {this.userList()}
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
