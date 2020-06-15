import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

function ImageUpload(props) {

    const [Product_image, setProduct_image] = useState([]);

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0]);
        
        axios.post('http://localhost:5000/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                      
                    setProduct_image([...Product_image, response.data.image]);
                    props.refresh([...Product_image, response.data.image]);
                    alert('Successfully Added Image');
                } else {
                    alert('Fail to Added Image');
                }
            })

    }


    const onDeleteImage = (addedImage) => {

        const image = Product_image.indexOf(addedImage);

        let newImage = [...Product_image];

        newImage.splice(image, 1);

        setProduct_image(newImage);
        props.refresh(newImage);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false} 
                maxSize={8000000000}>

                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '270px', border: '2px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <i className="fa fa-plus">    Click Here To Add Image</i>
                        
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '270px', overflowX: 'scroll' }}>

                {Product_image.map((image, index) => (
                    <div key={index} onClick={() => onDeleteImage(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}

            </div>

        </div>
    )
}

export default ImageUpload;
