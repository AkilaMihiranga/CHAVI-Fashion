import React from "react";
import './style.css';

const WishlistItem = props => {
    return(
        <div className="card card-body col-md-7 m-auto p-auto">
            <div className="SingleItem">
            <div className="ItemWrapper">
                <div className="ItemImage" style={{width: '100px', height: '100px', overflow: 'hidden', position: 'relative'}}>
                    <img style={{maxWidth: '100%', maxHeight: '100%', position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} src={`http://localhost:5000/${props.image}`} alt="" />
                </div>
                <div className="ItemDetails">
                    <p className="ItemName">{props.name}</p>
                    <p className="ItemPrice">RS. {props.total}</p>
                </div>
                <div className="ItemDetails">
                    <p></p>
                    <button className="btn btn-info"><i className="fas fa-shopping-cart"></i>&nbsp;ADD TO CART</button>
                </div>
                <div className="ItemDetails">
                    <p></p>
                    <button className="btn btn-danger"><i className="fas fa-trash-alt"></i>&nbsp;REMOVE</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default WishlistItem;