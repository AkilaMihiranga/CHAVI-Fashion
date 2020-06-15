const express = require('express');
const router = express.Router();
const Product = require("../models/product"); 
const multer = require('multer');


var storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => { 
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => { 
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg') {
            return cb(res.status(400).end('only jpg, png, jpeg are allowed'), false);
        }
        cb(null, true);
    }
});

var upload = multer({ storage: storage }).single("file");


router.post("/uploadImage", (req, res) => {

    upload(req, res, err => {
        if (err) return res.json({ success: false, err })

        return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
    });

});




router.post("/upload-product", (req, res) => {

    const product = new Product(req.body);

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

router.post('/get-products',(req,res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

        Product.find()
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })//success msg and sebd all products info
            })
    

});

router.delete('/delete-product/:id',(req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => {
            res.status(200).json({
                data: product
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

router.post('/update/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id)
        .then(product => {
            product.product_name = req.body.product_name,
            product.product_slug = req.body.product_slug,
            product.product_price = req.body.product_price,
            product.product_description = req.body.product_description,
            product.product_keyword = req.body.product_keyword,
            product.category = req.body.category,

            product.save()
                    .then(product => {
                        res.status(200).json({
                            data: product
                        });
                    })
                    .catch(error => {
                        res.status(400).json({
                            error: error
                        });
                    });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        })
});

router.get('/edit-page/:id',(req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.status(200).json({
                data: product
            });
        })
        .catch(error => {
            res.status(400).json({
                error: error
            });
        });
});

router.get('/product_id', (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }

    Product.find({ '_id': { $in: productIds } })
        .exec((err, product) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(product)
        })

   
});

module.exports = router;
