import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as authActions from '../../../actions/authActions';
import './style.css';

import { connect } from 'react-redux';

class BottomHeader extends Component{

    render() {

        let guestAccount = <ul className="Menu">
            <li className="MenuItem"><Link to="/"><i className="fas fa-home"></i></Link></li>
            <li className="MenuItem"><Link to="/products/all" className="MenuItemElement">Shop&nbsp;<i className="fas fa-caret-down"></i></Link></li>
            <li className="MenuItem"><Link to="/categories">Categories</Link></li>
            <li className="MenuItem"><Link to="/contact-us">Contact Us</Link></li>
            <li className="MenuItem"><Link to="/about-us">About Us</Link></li>
        </ul>;
        if(this.props.auth.isAuthenticated && this.props.auth.user.userRole === 'admin'){
            guestAccount = <ul className="Menu">
                <li className="MenuItem"><Link to="/admin-dashboard"><i className="fas fa-home"></i></Link></li>
                <li className="MenuItem"><Link to="/products/all" className="MenuItemElement">Shop&nbsp;<i className="fas fa-caret-down"></i></Link></li>
                <li className="MenuItem"><Link to="/category-list">Categories</Link></li>
                <li className="MenuItem"><Link to="/admins-list">Admins</Link></li>
                <li className="MenuItem"><Link to="/store-managers-list">Store Managers</Link></li>
                <li className="MenuItem"><Link to="/users-list">Users</Link></li>
                <li className="MenuItem"><Link to="/all-orders">Orders</Link></li>
                <li className="MenuItem"><Link to="/contact-us">Contact Us</Link></li>
                <li className="MenuItem"><Link to="/about-us">About Us</Link></li>
            </ul>;
        }
        if(this.props.auth.isAuthenticated && this.props.auth.user.userRole === 'storeManager'){
            guestAccount = <ul className="Menu">
                <li className="MenuItem"><Link to="/store-manager-dashboard"><i className="fas fa-home"></i></Link></li>
                <li className="MenuItem"><Link to="/products/all" className="MenuItemElement">Shop&nbsp;<i className="fas fa-caret-down"></i></Link></li>
                <li className="MenuItem"><Link to="/product-list">Products</Link></li>
                <li className="MenuItem"><Link to="/all-orders">Orders</Link></li>
                <li className="MenuItem"><Link to="/contact-us">Contact Us</Link></li>
                <li className="MenuItem"><Link to="/about-us">About Us</Link></li>
            </ul>;
        }

        return (
            <div className="BottomHeader">
                {guestAccount}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomHeader);