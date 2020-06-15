import React, { Component } from 'react';
import Products from './Products/Products';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Slideshow from '../SlideShow/Slide';
import Footer from '../Footer/index';


class ShopStore extends Component{


    render() {

        return (
            <React.Fragment>
                <Header/>
                <Slideshow />
                <Switch>
                    <Route path="/" exact component={Products} />
                </Switch><br/><br/><br/>
                <Footer />
            </React.Fragment>

        );
    }
}



export default ShopStore;