import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Slideshow from '../../components/SlideShow/Slide';
import Products from '../../components/ShopStore/Products/Products';
import Footer from '../../components/Footer/index';

class AdminDashboard extends Component{

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Slideshow />
                <Products /><br/><br/><br/>
                <Footer />
            </React.Fragment>

        );
    }
}
export default AdminDashboard;