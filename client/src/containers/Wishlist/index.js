import React, {Component} from "react";
import Header from '../../components/Header/Header';
import './style.css';
import * as cartActions from '../../actions/cartAction';
import * as wishlistActions from '../../actions/wishlistAction';
import * as authActions from '../../actions/authActions';
import {connect} from 'react-redux';
import Footer from '../../components/Footer/index';

class Wishlist extends Component{
    state = {
        wishlistItems : []
    }
    
    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result) {
                        const wishlistItems = this.props.getWishlistItems(this.props.auth.token, this.props.auth.user.user_id)
                        return wishlistItems;
                    }
                    return [];
                })
                .then(wishlistItems => {
                    if(wishlistItems.wishlist.length > 0 ){

                        console.log(this.props.wishlist)

                        this.setState({
                            wishlistItems: this.props.wishlist.wishlistItem
                        })
                    }
                })
                .catch(error => {
                        console.log(error);
                })
        }
        else {
            this.setState({
                wishlistItems : this.props.wishlist.wishlistItem
            })
        }
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
        this.props.addToCart(auth.token, cartItem)
        .then(response => {
            //console.log(response);
            console.log(response.message.cart);
        })
        .catch(error => {
            console.log(error);
        });
    }

    deleteWishlistItem = (productId) => {

        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
            return;
        }

        const user_id = this.props.auth.user.user_id;
        const product = {
            productId: productId
        }


        this.props.deleteWishlistItem(user_id, product)
        .then(response => {
            //console.log(response);
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }



    render(){

        return(
            <React.Fragment>
                <Header/>
                <div className="Content">
                    <div className="CartWrapper">
                        <div className="card card-body">
                            <div className="CardTitle">
                                <h2 className="text-center"><b>MY WISH LIST</b></h2>
                            </div>
                            <div>
                                {
                                    this.state.wishlistItems.map(product =>
                                        <div className="card card-body col-md-7 m-auto p-auto" key={product.product}>
                                                <div className="SingleItem">
                                                <div className="ItemWrapper">
                                                    <div className="ItemImage" style={{width: '100px', height: '100px', overflow: 'hidden', position: 'relative'}}>
                                                        <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={`/${product.image}`} alt="" />
                                                    </div>
                                                    <div className="ItemDetails">
                                                        <p className="ItemName">{product.name}</p>
                                                        <p className="ItemPrice">RS. {product.price}</p>
                                                    </div>
                                                    <div className="ItemDetails">
                                                        <p></p>
                                                        <a href="/wishlist" className="btn btn-info" onClick={() => { this.addToCart(product.product, product.price, product.name, product.image); this.deleteWishlistItem(product.product)}}><i className="fas fa-shopping-cart"></i>&nbsp;ADD TO CART</a>
                                                    </div>
                                                    <div className="ItemDetails">
                                                        <p></p>
                                                        <a href="/wishlist" className="btn btn-danger" onClick={() => { this.deleteWishlistItem(product.product) }}><i className="fas fa-trash-alt"></i>&nbsp;REMOVE</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                }
                            </div>
                        </div>

                        

                    </div>
                </div><br/><br/><br/>
                <div style={{marginTop: '650px'}}>
                <Footer />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth,
        wishlist: state.wishlist
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getWishlistItems: (token, user_id) => dispatch(wishlistActions.getWishlistItems(token, user_id)),
        updateWishlist : (token, user_id, product) => dispatch(wishlistActions.updateWishlist(token, user_id, product)),
        getToken : () => dispatch(authActions.getToken()),
        addToCart: (token, cartItem) => dispatch(cartActions.addToCart(token, cartItem)),
        deleteWishlistItem:(user_id, product) => dispatch(wishlistActions.deleteWishlistItem(user_id, product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);