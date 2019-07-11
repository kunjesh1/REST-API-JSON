const express = require('express');
const fs = require('fs');
const util = require('util');
const router = express.Router();
const readFile = util.promisify(fs.readFile); 
var product;
var read = readFile('./product.json', 'utf8');


//Handling Get request for the Products
router.get('/', (req, res, next) => {

    //console.log(typeof(read()));
    read.then(product => JSON.parse(product)).then((product) => {
        res.status(200).json({

            message: 'Handling get requests to /products',
            product: product
        });
    }
    ).catch(err=>console.log(err));



});

//Handling GET request for the particular ID
router.get('/:id', (req, res, next) => {

    var id = req.params.id;
    var find;
    read.then(product => JSON.parse(product)).then((product) => {
        console.log(id);
        find=product.filter(d=>{if(d.id==id)return d;});
            console.log(find);
            console.log(find);
            if(find.length===0)
            {
            
                    res.status(404).json({
            
                        message: "Not found particular id"
                    });
            }

            else{
        res.status(200).json({

            message: 'Handling get requests to /products id',
            product: find
        });
    }

}
    ).catch(err=>console.log(err));

});


//Handling POST resquest for the products
router.post('/', (req, res, next) => {

   var product_input = {

        "id": req.body.id,
        "name": req.body.name,
        "qty": req.body.qty,
        "price": req.body.price

    };
    read.then(product => JSON.parse(product)).then(product =>{

        
    product.push(product_input);
     console.log(product_input);


    fs.writeFile('./product.json', JSON.stringify(product), (err) => {


        if (err) throw err;
        console.log("Data is appended successfully");

    });


    res.status(200).json({

        message: 'Handling post request to /products',


    });

}).catch(err=>console.log(err));

});

//PUT method for the particular ID for the product
router.put('/:id', (req, res, next) => {
      id = req.params.id;
     
     var product_input;
     var find;

    read.then(product => JSON.parse(product)).then(product => {
       
       
       // console.log(product);
        product_input = {

            "id": req.body.id,
            "name": req.body.name,
            "qty": req.body.qty,
            "price": req.body.price

        };

      //Find if particular id exists or not
       find= product.filter((d,index)=>{
            if(d.id==id) {product[index]=product_input;return d;}
        });
   
       //If not exist then throw error 404
     if(find.length===0)
        {
        
                res.status(404).json({
        
                    message: "Not found particular id to PUT request."
                });
        }
        //If exist then update to the JSON file
        else 
        {

        console.log(find);  

        fs.writeFile('./product.json', JSON.stringify(product), (err) => {


            if (err) throw err;
            console.log("Data is appended successfully");

        });


        res.status(200).json({

            message: 'Handling PUT request to /products for particular id',


        });}

    }).catch(err=>console.log(err));

});

//DELETE method to delete the particular element from the products

router.delete("/:id", (req, res, next) => {

    read.then(product => JSON.parse(product)).then(product => {
       
  var id=req.params.id;  
        //console.log(product,id);

        var updated_product;


        updated_product=product.filter(d=>{
            return d.id!=id;
        });


        console.log(updated_product);

        fs.writeFile('./product.json', JSON.stringify(updated_product), (err) => {


            if (err) throw err;
            console.log("Data is deleted successfully");

        });

       res.status(200).json({

        message:"Handle delete request from the /products",
        product:updated_product

       });
}).catch(err=>console.log(err));
});


module.exports = router;