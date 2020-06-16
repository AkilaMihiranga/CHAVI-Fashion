import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import ProductImageSlider from "./ProductImageSlider";
import './productDesign.css';

function ProductList(props) {

    const [Products, setProducts] = useState([]);

    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(6);
    const [PostSize, setPostSize] = useState();

    useEffect(() => {
        const variables = {
            skip: Skip,
            limit: Limit,
        }
        getProducts(variables);
    }, []);

    const getProducts = (variables) => {
        axios.post('/product/get-products', variables)
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

    const onDeleteProduct = (id) => {
        axios.delete('/product/delete-product/'+id)
           .then(res =>{
                console.log(res.data);
                alert('Product Delete Successfully');
           }); 
    }

    const onEditProduct = (id) => {
        console.log(id);
        props.history.push("/edit-product/"+id);
    }

    const UploadedProduct = Products.map((product, index) => { 
        return <div key={product._id}>
             <div className="card" style={{backgroundColor: 'pink'}}>
                {<a href={`/product/${product._id}`} >
                    <ProductImageSlider images={product.product_image} /></a>}

                    <div style={{ display: 'flex', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                        <p> {product.product_name}</p>
                    </div>
                    <div style={{ display: 'flex', height: '50px', justifyContent: 'center', alignItems: 'center' }}>
                        <p> {`Rs.${product.product_price}/=`}</p>
                    </div>
                    <div className="col-lg-12">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="btn btn-outline-success btn-lg btn-block" onClick={() => {onEditProduct(product._id)}}>Edit</button>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <a href="/product-list" className="btn btn-outline-danger btn-lg btn-block" onClick={() => {onDeleteProduct(product._id)}}>Delete</a>
                        </div>
                    </div>                
                </div> 
        </div>
    })
    
        return (
           <div>
               <Header/>
                    <div className="col-md-10 m-auto">
                        <div className="card card-body">
                            <h1><a className="btn btn-warning col-md-12" href="/add-product"><i className="fa fa-plus"></i> Add New Product</a></h1>
                            <br/><br/>
                            <h1 className="text-center"> Store Manager Product List </h1>

                            
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

export default ProductList;

