import React from 'react';
import './singleProduct.css';

function ProductImageGallery(props) {
    return (
        <div className="SingleProduct">
        <div className="SingleProductImage">
            {props.detail.product_image && props.detail.product_image.map((image, index) => (
                <div key={index}>
                    <img style={{ width: '100%', maxHeight: '150%' }}
                        src={`http://localhost:5000/${image}`} alt="singleProduct" />
                </div>
            ))}
            </div>
        </div>
    )
}

export default ProductImageGallery;
