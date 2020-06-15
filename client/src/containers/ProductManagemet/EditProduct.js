import React, { Component } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import ProductImageGallery from './ProductImageGallery';
import './editPage.css';

export default class EditProduct extends Component {

    constructor(props) {
        super(props);

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductSlug = this.onChangeProductSlug.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
        this.onChangeProductImage = this.onChangeProductImage.bind(this);
        this.onChangeProductKeyword = this.onChangeProductKeyword.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product_name: '',
            product_slug: '',
            product_price: '',
            product_description: '',
            product_image: '',
            product_keyword: '',
            category: '',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/product/edit-page/'+this.props.match.params.id)
            .then(response => {
                console.log(response);
                this.setState({
                    product_name: response.data.data.product_name,
                    product_slug: response.data.data.product_slug,
                    product_price: response.data.data.product_price,
                    product_description: response.data.data.product_description,
                    product_image: response.data.data.product_image,
                    product_keyword: response.data.data.product_keyword,
                    category: response.data.data.category
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeProductName(e) {
        this.setState({
            product_name: e.target.value
        });
    }

    onChangeProductSlug(e) {
        this.setState({
            product_slug: e.target.value
        });
    }

    onChangeProductPrice(e) {
        this.setState({
            product_price: e.target.value
        });
    }

    onChangeProductDescription(e) {
        this.setState({
            product_description: e.target.value
        });
    }

    onChangeProductImage(e) {
        this.setState({
            product_image: e.target.value
        });
    }

    onChangeProductKeyword(e) {
        this.setState({
            product_keyword: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const products= {
            product_name: this.state.product_name,
            product_slug: this.state.product_slug,
            product_price: this.state.product_price,
            product_description: this.state.product_description,
            product_keyword: this.state.product_keyword,
            category: this.state.category
        }

        axios.post('http://localhost:5000/product/update/'+this.props.match.params.id, products)
            .then(res => console.log(res.data));

        window.location = '/product-list';
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="row mt-5">
                    <div className="col-md-10 m-auto">
                        <div className="card card-body">
                            <h1 className="text-center mb-3">Update {this.state.product_name} </h1>
                            <br/><br/>
                        <div className="card card-body">

                            <div className="row">
                            <div className="col-md-5 lg">
                                <ProductImageGallery detail={this.state} />
                            </div>
                            <div className="col-md-6 lg-2"><br/><br/>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className="form-group">
                                    <label>Product Name :</label>
                                    <input
                                        type="text" name="category_name" value={this.state.product_name} onChange={this.onChangeProductName}
                                        className="form-control" placeholder="Enter Category Name"/>
                                </div>
                                <div className="form-group">
                                <label>Product Slug :</label>
                                    <input type="text" name="category_slug" value={this.state.product_slug} onChange={this.onChangeProductSlug}
                                        className="form-control" placeholder="Enter Slug"/>
                                </div>
                                <div className="form-group">
                                <label>Product Price :</label>
                                    <input type="text" name="category_parent" value={this.state.product_price} onChange={this.onChangeProductPrice}
                                        className="form-control" placeholder="Enter Parent"/>
                                </div>
                                <div className="form-group">
                                <label>Product Description :</label>
                                    <input type="text" name="category_parent" value={this.state.product_description} onChange={this.onChangeProductDescription}
                                        className="form-control" placeholder="Enter Parent"/>
                                </div>
                                <div className="form-group">
                                <label>Product Keyword :</label>
                                    <input type="text" name="category_parent" value={this.state.product_keyword} onChange={this.onChangeProductKeyword}
                                        className="form-control" placeholder="Enter Parent"/>
                                </div>
                                <div className="form-group">
                                <label>Product Category :</label>
                                    <input type="text" name="category_parent" value={this.state.category} onChange={this.onChangeCategory}
                                        className="form-control" placeholder="Enter Parent"/>
                                </div>
                                <br/><br/>
                                
                                <button type="submit" className="btn btn-warning btn-block">Update Product</button><br/>
                                <a href="/product-list" className="btn btn-danger btn-block">Cancel</a>
                                <br/><br/>
                            </form>
                            </div>
                            </div>
                        </div>    
                        </div>
                    </div>
                </div>
            </div>   
        );
    }
}
