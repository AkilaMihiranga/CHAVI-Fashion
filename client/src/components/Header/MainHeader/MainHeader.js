import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { connect } from 'react-redux';
import * as authActions from '../../../actions/authActions';

const MainHeader = props => {
    return (
        <div className="MainHeader">
            <div></div>
            <div>
            <Link to="/wishlist"><i className="fas fa-heart">({props.wishlistCount})</i></Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/cart"><i className="fas fa-shopping-cart">({props.cartCount})</i></Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart: state.cart,
        wishlist: state.wishlist
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);