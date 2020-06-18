import React, {Component} from "react";
import Header from '../../components/Header/Header';
import * as cartActions from '../../actions/cartAction';
import * as authActions from '../../actions/authActions';
import {connect} from 'react-redux';
import CartPrice from '../../components/CartPrice';
import './style.css';
import Footer from '../../components/Footer/index';
import QuantityControl from '../../components/QuantityControl/index';
class Cart extends Component{
    state = {
        cartItems : []
    }

    decreaseQuantity = (e, productId) => {
        this.updateCart(productId, -1);
    }

    increaseQuantity = (e, productId) => {
        this.updateCart(productId, 1);
    }

    updateCart = async(productId, quantity) => {
        try{
            const auth = this.props.auth;
            let product = this.state.cartItems.find(item => item.product === productId);
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
            const response = await this.props.updateCart(auth.token, auth.user.user_id, product);
            if(response.ok === 1){
                const {cartItems} = this.state;
                this.setState({
                    cartItems: cartItems.map(item => item.product === productId?
                        {...item, quantity: item.quantity + quantity, total: item.total + (item.price * quantity)}: item)
                })
            }

        }catch (error) {
            console.log(error);
        }
    }

    changeQuantity = (e, productId) => {
        // console.log(e.target.value);

        // if(isNaN(e.target.value)){
        //     return;
        // }

        // const firstDigit = parseInt(e.target.value.split("")[0]);
        // if(firstDigit === 0){
        //     return;
        // }

        // //alert(e.target.value);

        // this.updateCart(productId, parseInt(e.target.value));
    }

    deleteCartItem = (productId) => {

        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
            return;
        }

        const user_id = this.props.auth.user.user_id;
        const product = {
            productId: productId
        }


        this.props.deleteCartItem(user_id, product)
        .then(response => {
            //console.log(response);
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result) {
                        const cartItems = this.props.getCartItems(this.props.auth.token, this.props.auth.user.user_id);
                        return cartItems;
                    }
                    return [];
                })
                .then(cartItems => {
                    if(cartItems.cart.length > 0 ){

                        console.log(this.props.cart)

                        this.setState({
                            cartItems: this.props.cart.cartItem
                        })
                    }
                })
                .catch(error => {
                        console.log(error);
                })
        }
        else {
            this.setState({
                cartItems : this.props.cart.cartItem
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
                            {/*List Cart Items*/}
                            <div className="CardTitle">
                                <h2 className="text-center"><b>MY CART</b></h2>
                            </div>
                            <div>

                                {
                                    this.state.cartItems.map(product =>
                                        <div className="card card-body" key={product.product}>
                                            <div className="SingleItem">
                                            <div className="ItemWrapper">
                                                <div className="ItemImage" style={{width: '100px', height: '100px', overflow: 'hidden', position: 'relative'}}>
                                                    <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={`/${product.image}`} alt="" />
                                                </div>
                                                <div className="ItemDetails">
                                                    <p className="ItemName">{product.name}</p>
                                                    <p className="ItemPrice">Rs. {product.total}</p>
                                                </div>
                                            </div>
                                            <div className="CartActionButtons">
                                                <QuantityControl
                                                    productId={product.product}
                                                    name={product.name}
                                                    quantity={product.quantity}
                                                    changeQuantity={this.changeQuantity}
                                                    increaseQuantity={this.increaseQuantity}
                                                    decreaseQuantity={this.decreaseQuantity}
                                                />
                                                <a href="/cart" className="btn btn-danger" onClick={() => { this.deleteCartItem(product.product) }}><i className="fas fa-trash-alt"></i>&nbsp;REMOVE</a>
                                            </div>
                                        </div>
                                        </div>
                                        )   
                                }
                            </div>
                        </div>

                        <CartPrice/>

                    </div>
                </div><br/><br/><br/>
                <div style={{marginTop: '550px'}}>
                <Footer />
                </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getCartItems: (token, user_id) => dispatch(cartActions.getCartItems(token, user_id)),
        updateCart : (token, user_id, product) => dispatch(cartActions.updateCart(token, user_id, product)),
        getToken : () => dispatch(authActions.getToken()),
        deleteCartItem:(user_id, product) => dispatch(cartActions.deleteCartItem(user_id, product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);