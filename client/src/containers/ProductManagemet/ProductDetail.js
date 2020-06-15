import React, {Component} from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import ProductImageGallery from "./ProductImageGallery";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as cartActions from '../../actions/cartAction';
import * as authActions from '../../actions/authActions';
import Footer from '../../components/Footer/index';
import * as wishlistActions from '../../actions/wishlistAction';
class ProductDetail extends Component{

    constructor(props) {
        super(props);
        

        this.onChangeWriter = this.onChangeWriter.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            product: [],
            Comments: [],
            product_id: '',
            writer: '',
            comment: ''
        }
    }
    onChangeWriter(e) {
        this.setState({
            writer: e.target.value
        });
    }

    onChangeComment(e) {
        this.setState({
            comment: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const comments = {
            postId: this.props.match.params.productId,
            writer: this.state.writer,
            comment: this.state.comment
        }

        axios.post('http://localhost:5000/comment/saveComment', comments)
            .then(res => console.log(res.data));

        window.location = '/product/'+this.props.match.params.productId;
    }

    
    componentDidMount() {

        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
            .then(result => {
                if(result){
                    this.props.getCartItems(this.props.auth.token, this.props.auth.user.user_id)
                    this.props.getWishlistItems(this.props.auth.token, this.props.auth.user.user_id)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                }
            })
            .catch(error => {
                console.log(error);
            })
        }

        const id = this.props.match.params.productId;
        axios.get(`http://localhost:5000/product/product_id?id=${id}&type=single`)//get product details using product id
            .then(response => {
                this.setState({
                    product: response.data[0]
                })
            })
            .catch(function (error) {
                console.log(error);
            });

        axios.get('http://localhost:5000/comment/get-comment')
        .then(response => {
            this.setState({
                Comments: response.data.data.filter(el => el.postId === id)
            })
            console.log(this.state.Comments);
        })
        .catch((error => {
            console.log(error);
        }))

    }

    addToCart = (productId, price, name, image) => {

        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
            return;
        }

        const { auth } = this.props;
        const cartItem = {
            user: auth.user.user_id,
            product: productId,
            name: name,
            image: image,
            quantity: 1,
            price: price
        }
        console.log(cartItem);
        this.props.addToCart(auth.token, cartItem)
        .then(response => {
            //console.log(response);
            console.log(this.props.cart);
        })
        .catch(error => {
            console.log(error);
        });
    }

    addToWishlist = (productId, price, name, image) => {

        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
            return;
        }

        const { auth } = this.props;
        const wishlistItem = {
            user: auth.user.user_id,
            product: productId,
            name: name,
            image: image,
            quantity: 1,
            price: price
        }
        console.log(wishlistItem);
        this.props.addToWishlist(auth.token, wishlistItem)
        .then(response => {
            //console.log(response);
            console.log(this.props.wishlist);
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        
        return (
            <div>
                <Header/>
                <div className="col-md-10 m-auto">
                    <div className="card card-body">
                    <h1 className="text-center"> {this.state.product.product_name} </h1>
                      <div className="card card-body">
                        <div className="row">
                                <div className="col-md-5 lg">
                                    <ProductImageGallery detail={this.state.product} />
                                </div>
                                <div className="col-md-6 lg-2">
                                    <div className="card card-body">
                                    <div className="jumbotron bg-light">
                                         <h3>Product Name: </h3><p>{this.state.product.product_name}</p><hr/>
                                         <h3>Product Price: </h3><p>Rs. {this.state.product.product_price} /=</p><hr/>
                                         <h3>Product Description: </h3><p>{this.state.product.product_description}</p><hr/>
                                         <h3>Product Category: </h3><p>{this.state.product.category}</p><hr/>
                                        <h3>Call Us On 0778990415 For More Details.</h3><br/>
    
                                        <div className="col-lg-12">
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button className="btn btn-outline-info btn-lg btn-block" onClick={() => { this.addToWishlist(this.state.product._id, this.state.product.product_price, this.state.product.product_name, this.state.product.product_image[0]) }}>ADD TO WISHLIST</button>
                                            </div><br/>
                                        </div>
                                        <div className="col-lg-12">
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <button className="btn btn-outline-warning btn-lg btn-block" onClick={() => { this.addToCart(this.state.product._id, this.state.product.product_price, this.state.product.product_name, this.state.product.product_image[0]) }}><i className="fas fa-shopping-cart"></i>&nbsp;ADD TO CART</button>
                                            </div>
                                        </div>     
                                        
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-5 lg-2">
                                <div className="card card-body"><br/><br/>
                                    <h2 className="text-center"> Add Your Comments ... </h2><hr/>
                                     <form onSubmit={this.onSubmit} autoComplete="off">
                                        <div className="form-group">
                                            <input type="text" name="writer" value={this.state.writer} onChange={this.onChangeWriter}
                                                className="form-control" placeholder="Enter Your Name"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="comment" value={this.state.comment} onChange={this.onChangeComment}
                                                className="form-control" placeholder="Enter Your Comment"/>
                                        </div>
                            
                                        <br/>
                                        <button type="submit" className="btn btn-warning btn-block">Add Comment</button>
                                        <a href="" className="btn btn-danger btn-block">Cancel</a>

                                     </form>
                                     </div>
                                </div>

                               <div className="col-md-6 lg-2">
                               <div className="card card-body" style={{backgroundColor: '#FFF0F5'}}><br/><br/>
                                     <h2 className="text-center"> Comments List  </h2><hr/>
                                         {this.state.Comments.map(comment => (
                                             <div key={comment._id}>
                                                 <div className="card card-body"><br/>
                                                 <h3><i className="fa fa-commenting" aria-hidden="true"></i> {comment.writer} </h3>
                                                    <h6> Comment : {comment.comment}</h6>
                                                 </div>
                                             </div>
                                         ))}
                                </div>
                                </div>   
                            </div>
                        </div>
                    </div>    
                </div><br/><br/><br/>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (token, cartItem) => dispatch(cartActions.addToCart(token, cartItem)),
        getCartItems: (token, user_id) => dispatch(cartActions.getCartItems(token, user_id)),
        getToken: () => dispatch(authActions.getToken()),
        addToWishlist: (token, wishlistItem) => dispatch(wishlistActions.addToWishlist(token, wishlistItem)),
        getWishlistItems: (token, user_id) => dispatch(wishlistActions.getWishlistItems(token, user_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
