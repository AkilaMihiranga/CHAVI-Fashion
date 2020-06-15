import React from "react";
import QuantityControl from '../../../components/QuantityControl/index';
import './style.css';

const CartItem = props => {
    return(
        <div className="card card-body">
            <div className="SingleItem">
            <div className="ItemWrapper">
                <div className="ItemImage" style={{width: '100px', height: '100px', overflow: 'hidden', position: 'relative'}}>
                    <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={`http://localhost:5000/${props.image}`} alt="" />
                </div>
                <div className="ItemDetails">
                    <p className="ItemName">{props.name}</p>
                    <p className="ItemPrice">Rs. {props.total}</p>
                </div>
            </div>
            <div className="CartActionButtons">
                <QuantityControl
                    productId={props.productId}
                    name={props.name}
                    quantity={props.quantity}
                    changeQuantity={props.changeQuantity}
                    increaseQuantity={props.increaseQuantity}
                    decreaseQuantity={props.decreaseQuantity}
                />
                <button className="btn btn-danger btn-sm"><i className="fas fa-trash-alt"></i>&nbsp;REMOVE</button>
            </div>
        </div>
        </div>
    )
}

export default CartItem;