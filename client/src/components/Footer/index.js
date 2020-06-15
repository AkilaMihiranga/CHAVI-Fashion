import React, { Component } from 'react';
import './style.css';

class Footer extends Component{
    render() {
        return (
            <footer className="footer">
                    <div className="row">
                        <div className="col-md-12 py-3">
                            <div className="text-center">
                                    <p>FOLLOW US ON : </p>
                                    <a href="/"className="fb-ic">
                                        <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a href="/" className="tw-ic">
                                        <i className="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a href="/" className="gplus-ic">
                                        <i className="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a href="/" className="li-ic">
                                        <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a href="/" className="ins-ic">
                                        <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                                    </a>
                                    <a href="/" className="pin-ic">
                                        <i className="fab fa-pinterest fa-lg white-text fa-2x"> </i>
                                    </a>            
                            </div>
                        </div>
                    </div>    

                    <div style={{backgroundColor:"CADETBLUE"}} className="footer-copyright text-center py-3">© 2020 Copyright:
                        <a href="/"> CHAVI Fashion</a>
                    </div>
            </footer>
        );
    }
}

export default Footer;