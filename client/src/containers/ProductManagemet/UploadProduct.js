import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import ImageUpload from "./ImageUpload";


function UploadProductpage(props) {

     const[Category,setCategory] = useState(1);
     const[CategoryValue, setCategoryValue] = useState([]);

     const [Product_name, setProduct_name] = useState("");
     const [Product_slug, setProduct_slug] = useState("");
     const [Product_price, setProduct_price] = useState("");
     const [Product_description, setProduct_description] = useState("");
     const [Product_keyword, setProduct_keyword] = useState("");
 
     const [Product_image, setProduct_image] = useState([]);

     useEffect(() => {
        axios.get('http://localhost:5000/category/')
            .then(response => {
                console.log(response.data.data);
                setCategoryValue(response.data.data)
            })

    }, []);
 
 
     const onProductNameChange = (event) => {
        setProduct_name(event.currentTarget.value);
     }
 
     const onProductSlugChange = (event) => {
        setProduct_slug(event.currentTarget.value);
     }
 
     const onProductPriceChange = (event) => {
        setProduct_price(event.currentTarget.value);
     }
 
     const onProductDescriptionChange = (event) => {
        setProduct_description(event.currentTarget.value);
     }

     const onProductKeywordChange = (event) => {
        setProduct_keyword(event.currentTarget.value);
     }

     const onProductCategoryChange = (event) => {
        setCategory(event.currentTarget.value);
     }
 
     const refreshImages = (newImages) => {
        setProduct_image(newImages);
     }
 
    const onSubmit = (event) => {
        event.preventDefault();

        if (!Product_name || !Product_slug || !Product_price ||
            !Product_description || !Product_image || !Product_keyword || !Category) {
            return alert('Some fields are empty. Fill all the fields first!');
        }
        const variables = {
            product_name: Product_name,
            product_slug: Product_slug,
            product_price: Product_price,
            product_description: Product_description,
            product_keyword: Product_keyword,
            product_image: Product_image,
            category: Category
        }

        axios.post('http://localhost:5000/product/upload-product', variables)
            .then(response => {
                if (response.data.success) {
                    props.history.push('/product-list');
                    alert('Product Successfully Uploaded');
                } else {
                    alert('Failed to upload Product');
                }
            });

    }
    
    return (
        <div>
            <Header/>
            <div className="row mt-6">
                <div className="col-md-6 m-auto">
                    <div className="card card-body"><br/><br/>
                        <h1 className="text-center mb-3">Upload Product Form</h1><br/><br/>

                        <form onSubmit={onSubmit}>

                            <ImageUpload refresh={refreshImages}/><br/><br/>

                            <div className="form-group">
                                <input type="text" name="Product_name" value={Product_name} onChange={onProductNameChange}
                                    className="form-control" placeholder="Enter Product Name"/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="Product_slug" value={Product_slug} onChange={onProductSlugChange}
                                    className="form-control" placeholder="Enter Slug"/>
                            </div>
                            <div className="form-group">
                                <input type="number" name="Product_price" value={Product_price} onChange={onProductPriceChange}
                                    className="form-control" placeholder="Enter Price"/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="Product_description" value={Product_description} onChange={onProductDescriptionChange}
                                    className="form-control" placeholder="Enter Description"/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="Product_keyword" value={Product_keyword} onChange={onProductKeywordChange}
                                    className="form-control" placeholder="Enter Keyword"/>
                            </div>
                            <div className="form-group">
                                <select onChange={onProductCategoryChange} name="Category" className="form-control" placeholder="Enter Category">
                                    {CategoryValue.map(item => (
                                        <option key={item._id} value={item.category_name}>{item.category_name}</option>
                                    ))}
                                </select>
                            </div>
                            <br/><br/>
                            <button type="submit" className="btn btn-warning btn-block">Add Product</button><br/>
                            <a href="/product-list" className="btn btn-danger btn-block">Cancel</a>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadProductpage;