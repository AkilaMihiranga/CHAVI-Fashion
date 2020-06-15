import React, {Component} from "react";
import Header from '../../components/Header/Header';
import './style.css';
import WishlistItem from './WishlistItem/index';
import * as wishlistActions from '../../actions/wishlistAction';
import * as authActions from '../../actions/authActions';
import {connect} from 'react-redux';
import Footer from '../../components/Footer/index';

class Wishlist extends Component{
    state = {
        wishlistItems : []
    }
    updateWishlist = async(productId, quantity) => {
        try{
            const auth = this.props.auth;
            let product = this.state.wishlistItems.find(item => item.product === productId);
            product = {
                productId: product.product,
                quantity: parseInt(product.quantity) + parseInt(quantity),
                newQuantity: quantity,
                price: product.price,
                total: parseFloat(product.total) + parseFloat(product.price * quantity)
            }
            if(product.quantity <= 0){
                return;
            }
            const response = await this.props.updateWishlist(auth.token, auth.user.user_id, product);
            if(response.ok === 1){
                const {wishlistItems} = this.state;
                this.setState({
                    wishlistItems: wishlistItems.map(item => item.product === productId?
                        {...item, quantity: item.quantity + quantity, total: item.total + (item.price * quantity)}: item)
                })
            }

        }catch (error) {
            console.log(error);
        }
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
                                        <WishlistItem
                                            key={product.product}
                                            productId={product.product}
                                            name={product.name}
                                            image={product.image}
                                            price={product.price}
                                            quantity={product.quantity}
                                            total={product.total}
                                        />)
                                }
                            </div>
                        </div>

                        

                    </div>
                </div><br/><br/><br/>
                <div style={{marginTop: '300px'}}>
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
        getToken : () => dispatch(authActions.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);