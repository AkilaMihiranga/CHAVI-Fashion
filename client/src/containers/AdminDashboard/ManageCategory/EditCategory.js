import React, {Component} from 'react';
import axios from 'axios';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/index';

export default class EditCategory extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSlug = this.onChangeSlug.bind(this);
        this.onChangeParent = this.onChangeParent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category_name: '',
            category_slug: '',
            category_parent: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/category/'+this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    category_name: response.data.data.category_name,
                    category_slug: response.data.data.category_slug,
                    category_parent: response.data.data.category_parent
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeName(e) {
        this.setState({
            category_name: e.target.value
        });
    }

    onChangeSlug(e) {
        this.setState({
            category_slug: e.target.value
        });
    }

    onChangeParent(e) {
        this.setState({
            category_parent: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const category= {
            category_name: this.state.category_name,
            category_slug: this.state.category_slug,
            category_parent: this.state.category_parent
        }

        axios.post('http://localhost:5000/category/update/'+this.props.match.params.id, category)
            .then(res => console.log(res.data));

        window.location = '/category-list';
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="mt-5">
                    <div className="col-md-4 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">UPDATE CATEGORY</h1>
                            <br/><br/>

                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className="form-group">
                                    <label>Category Name</label>
                                    <input
                                        type="text" name="category_name" value={this.state.category_name} onChange={this.onChangeName}
                                        className="form-control" placeholder="Enter Category Name"/>
                                </div>
                                <div className="form-group">
                                <label>Category Slug</label>
                                    <input type="text" name="category_slug" value={this.state.category_slug} onChange={this.onChangeSlug}
                                        className="form-control" placeholder="Enter Slug"/>
                                </div>
                                <div className="form-group">
                                <label>Category Parent</label>
                                    <input type="text" name="category_parent" value={this.state.category_parent} onChange={this.onChangeParent}
                                        className="form-control" placeholder="Enter Parent"/>
                                </div>
                                <br/><br/>
                                
                                <button type="submit" className="btn btn-warning btn-block">Update Category</button><br/>
                                <a href="/category-list" className="btn btn-danger btn-block">Cancel</a>
                            </form>
                        </div>
                    </div>
                </div><br/><br/><br/>
                <Footer />
            </div>   
        );
    }
}
