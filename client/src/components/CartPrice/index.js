import React from "react";
import './style.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CartPrice = props => {
    return(
        <div className="card card-body col-md-4">
            <div className="CardTittle">
            <h2 className="text-center"><b>PRICE DETAILS</b></h2><hr/>
            </div>
            <div className="CardBody">
                <div className="FinalBilling">
                    <div className="Row">
                        <p>Price ({props.cart.cartCount})</p>
                        <p>Rs. {props.cart.totalAmount}</p>
                    </div>
                    <div className="Row">
                        <p>Delivery</p>
                        <p>Rs. 0</p>
                    </div>
                    <hr />
                    <div className="Row">
                        <h4><b>Total Payable</b></h4>
                        <h4><b>Rs. {props.cart.totalAmount}</b></h4>
                    </div><hr/>
                    <br/><br/>
                    <div className="col-lg-12">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Link to={"/place-order"} className="btn btn-warning btn-lg btn-block"><i className="fas fa-cart-arrow-down"></i>&nbsp;Place Order</Link>
                        </div>
                    </div> 
                </div>
            </div>
        </div>

    );

}

const mapStateToProps = state => {
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps, null)(CartPrice);