import React from 'react';
import './productDesign.css';

function ProductImageSlider(props) {
    return (
        <div className="Product">
            <div className="ProductImage">
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150%' }}
                            src={`/${image}`} alt="productImage" />
                    </div>
                ))}
                </div>
            </div>
    )
}

export default ProductImageSlider;
