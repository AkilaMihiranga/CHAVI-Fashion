import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/index';

const StoreManager = props => (
    <tr>
        <td>{props.manager.first_Name}</td>
        <td>{props.manager.last_Name}</td>
        <td>{props.manager.email}</td>
        <td>{props.manager.gender}</td>
        <td>{props.manager.contact_Number}</td>
        <td>
            <Link to={"/edit-store-manager/"+props.manager._id} className="btn btn-primary">Edit</Link>
        </td>
        <td>
            <a href="/store-managers-list" className="btn btn-danger" onClick={() => {props.deleteStoreManager(props.manager._id) } }>Delete</a>
        </td>
    </tr>
)

export default class StoreManagersList extends Component{

    constructor(props) {
        super(props);

        this.deleteStoreManager = this.deleteStoreManager.bind(this);
        this.state = {managers: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/storeManager/')
            .then(response => {
                this.setState({
                    managers: response.data.data.filter(el => el.userRole === 'storeManager')
                })
            })
            .catch((error => {
                console.log(error);
            }))
    }

    deleteStoreManager(id) {
        axios.delete('http://localhost:5000/storeManager/' +id)
            .then(res => console.log(res.data));

        this.setState({
            managers: this.state.managers.filter(el => el._id !== id)
        })
    }

    storeManagerList() {
        return this.state.managers.map(currentAdmin => {
            return <StoreManager manager={currentAdmin} deleteStoreManager={this.deleteStoreManager} key={currentAdmin._id}/>;
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="mt-5">
                    <div className="col-md-10 m-auto">
                        <div className="card card-body">
                            <h1><a className="btn btn-primary" href="/add-store-manager"><i className="fa fa-plus"></i> ADD NEW STORE MANAGER</a></h1>
                            <h1 className="text-center">STORE MANAGER LIST</h1>
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
                                            {this.storeManagerList()}
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
