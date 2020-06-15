import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../../Header/Header';
import ProductImageSlider from "../../../containers/ProductManagemet/ProductImageSlider";
import '../../../containers/ProductManagemet/productDesign.css';
import './style.css';

function AllProducts(props) {

    const [Products, setProducts] = useState([]);


    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(9);
    const [PostSize, setPostSize] = useState();

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        }
        getProducts(variables);
    }, []);

    const getProducts = (variables) => {
        axios.post('http://localhost:5000/product/get-products', variables)
        .then(response => {
            if (response.data.success) { 
                if (variables.loadMore) {
                    setProducts([...Products, ...response.data.products])
                } else {
                    setProducts(response.data.products)
                }
                setPostSize(response.data.postSize) //set the number of items
            } else {
                alert('Somthing Wrong...');
            }
        })

    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(variables)
        setSkip(skip)
    }

    const UploadedProduct = Products.map((product, index) => { 
        return <div key={product._id}>
             <div className="card" style={{backgroundColor: '#FFF0F5'}}>
                {<a href={`/product/${product._id}`} >
                    <ProductImageSlider images={product.product_image} /></a>}

                    <div style={{ display: 'flex', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                        <p> {product.product_name}</p>
                    </div>
                    <div style={{ display: 'flex', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                        <p> {`Rs.${product.product_price}/=`}</p>
                    </div>
                               
                </div> 
        </div>
    })
    
        return (
           <div>
               <Header />
                    <div className="col-md-10 m-auto">
                        <div className="card card-body"><br/>
                        <h2 className="CategoryTitle" style={{display: 'flex', justifyContent: 'center'}}> Our Products</h2>
                            <br/>
        
                            {Products.length === 0 ?
                                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                                    <h2>No post yet...</h2>
                                </div> :
                                <div className="Content"><br/>
                                    <div className="ProductArea">
                                        {UploadedProduct}
                                    </div>  
                                </div>
                            }
                            <br /><br />

                            {PostSize >= Limit && //if postsize is greater than or equal to limit then lordmore button didnt display
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button className="btn btn-info"
                                            onClick={onLoadMore}>Load More</button>
                                </div>
                            }
                        </div>
                    </div> 
           </div>   
        );
}

export default AllProducts;





