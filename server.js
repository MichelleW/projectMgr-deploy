// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/products_db");
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title must exist.'],
    minlength: [4, 'Length must be at least 3 characaters long.']
  },
  price: {
    type: Number,
    required: [true, 'Please privide a price.']
  },
  imgUrl: String
})
mongoose.model('Product', ProductSchema);
const Product = mongoose.model('Product');

// Path
const path = require('path');

// Routes
app.get('/productmgr-products', function (req, res) {
  //   Product.create({ title: "Nikon EEE I", price:  1500, imgUrl: "https://www.practicalecommerce.com/wp-content/uploads/images/0006/0918/nikon_d800_lightbox.jpg" }, function(err, products) {
  //     res.json(products);
  // })

  Product.find({}, function (err, products) {
    res.json(products);
  });
})

app.get('/productmgr-products/:id', function (req, res) {

  Product.findById(req.params.id, function (err, product) {
    if (err) {
      res.json(err);
    } else {
      res.json(product);
    }
  })
})



app.post('/productmgr-products', function (req, res) {
  productInstance = new Product();
  productInstance.title = req.body.title;
  productInstance.price = req.body.price;
  productInstance.description = req.body.imgUrl;
  productInstance.save(function (err) {
    let formCheck = {validation: true}
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(productInstance);
    }
  })
})

// delete NOT WORKING!
  
  app.delete('/productmgr-products/:id', function(req, res) {
    console.log("SERVER > delete id:", req.params.id)
    Product.deleteOne({_id: req.params.id}, function(err){
        if(err){
            res.json(err);
        } else {
            res.json(true);
        }
    })
})

//update 
app.put('/productmgr-products/:id', function(req, res) {
  console.log("SERVER > put product/id");
  console.log("SERVER > put product/id params.id", req.params.id);
  console.log("SERVER > put product/id body", req.body);
  Product.findById(req.params.id, function(err, product){
      console.log("SERVER > findbyid, err ", err)
      console.log("SERVER > findbyid, product ", product)
      if(err){

      } else {
          console.log("product found for update:", product);
          product.title = req.body.title;
          product.imgUrl = req.body.imgUrl;
          product.price = req.body.price;
          product.save(function(err){
              if(err){
                  res.json(err);
              } else {
                  res.json(true);
              }
          })
      }
  })
})




// ============ Static Routes ============ 
// Will use: path 
app.use(express.static(path.join(__dirname, "productmgr-app/dist/productmgr-app")));
// =======================================

//send mismatch route to angular and angular will redirect to the angular path
app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./productmgr-app/dist/productmgr-app/index.html"))
});



// ============ Server ============ 
// Will require: express/app 
app.listen(8000);
// ================================