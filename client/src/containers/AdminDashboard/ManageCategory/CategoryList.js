import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/index';

const Category = props => (
    <tr>
        <td>{props.category.category_name}</td>
        <td>{props.category.category_slug}</td>
        <td>{props.category.category_parent}</td>
        <td>
            <Link to={"/edit-category/"+props.category._id} className="btn btn-success">Edit Category</Link>
        </td>
        <td>
            <a href="/category-list" className="btn btn-danger" onClick={() => {props.deleteCategory(props.category._id) } }>Delete Category</a>
        </td>
    </tr>
)

export default class CategoryList extends Component{

    constructor(props) {
        super(props);

        this.deleteCategory = this.deleteCategory.bind(this);
        this.state = {categories: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/category/')
            .then(response => {
                console.log(response);
                this.setState({
                    categories: response.data.data
                })
            })
            .catch((error => {
                console.log(error);
            }))
    }

    deleteCategory(id) {
        axios.delete('http://localhost:5000/category/' +id)
            .then(res => console.log(res.data));

        this.setState({
            categories: this.state.categories.filter(el => el._id !== id)
        })
    }

    categoryList() {
        return this.state.categories.map(currentCategory => {
            return <Category category={currentCategory} deleteCategory={this.deleteCategory} key={currentCategory._id}/>;
        })
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="mt-5">
                    <div className="col-md-10 m-auto">
                        <div className="card card-body">
                            <h1><a className="btn btn-info col-md-12" href="/add-category"><i className="fa fa-plus"></i> Add New Category</a></h1>
                            <br/><br/>
                            <h1 className="text-center">Category List</h1>
                            <div className="row mt-1">
                                <div className="col-md-12 m-auto">
                                    <div className="card border-primary card-body text-center">
                                        <table className="table table-hover">
                                            <thead>
                                            <tr className="table-info">
                                                <th scope="col">Category Name</th>
                                                <th scope="col">Category Slug</th>
                                                <th scope="col">Category Parent</th>
                                                <th scope="col">Update Category</th>
                                                <th scope="col">Remove Category</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.categoryList()}
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
