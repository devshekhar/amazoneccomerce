const router =require('express').Router();
const Product =require('../models/product');
const checkJWT =require('../middlewares/check-jwt');
const multer =require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require("multer-storage-cloudinary");
const faker = require('faker');

cloudinary.config({
    cloud_name:'dmpebyjbd',
    api_key:'676611544322966',
    api_secret:'uG5orYO7_gNmLqsZJz7XfVP7fGg'
});
const storage = cloudinaryStorage({
    cloudinary:cloudinary,
    folder:'amazeno',
    allowedFormats:["jpg","png"],
    transformation:[{width:500,height:500,crop:"limit"}]
});
const parser =multer({storage:storage});
router.route('/products')
.get([checkJWT],(req,res,next)=>{
    Product.find({owner:req.decoded.user._id})
    .populate('owner')
    .populate('category')
    .exec((err,products)=>{
res.json({
    success:true,
    message:'get all product list',
    products:products
})
    })
})
.post([checkJWT,parser.single('product_picture')],(req,res,next)=>{
    const host = req.host;
const filePath = req.file.url;
let product= new Product();
product.owner= req.decoded.user._id;
product.category=req.body.categoryId;
product.title=req.body.title;
product.price=req.body.price;
product.description=req.body.description;
product.image=filePath;
product.save()
res.json({
    success:true,
    message:'Successfully added the product'
});
});

router.get('/faker/test',(req,res,next)=>{
    for(i=0;i<20;i++){
        let product = new Product;
        product.category ="5c85b374c3c9cb0d20519167";
        product.owner="5bd4b5589d725a2f741905d0";
        product.image=faker.image.cats();
        product.title=faker.commerce.productName();
        product.description=faker.lorem.words();
        product.description=faker.lorem.words();
        product.price = faker.commerce.price();
        product.save();
    }
    res.json({
        message:"successfully added 20items"
    })
})
module.exports=router;