const express = require('express');
const fs = require('fs');
const util = require('util');
const router = express.Router();
const readFile = util.promisify(fs.readFile);
var product;
var read = readFile('./product.json', 'utf8');


router.get('/', (req, res, next) => {

    //console.log(typeof(read()));
    read.then(product => JSON.parse(product)).then((product) => {
        res.status(200).json({

            message: 'Handling get requests to /products',
            product: product
        });
    }
    );



});


router.get('/:id', (req, res, next) => {

    id = req.params.id;

    read.then(product => JSON.parse(product)).then((product) => {
        res.status(200).json({

            message: 'Handling get requests to /products id',
            product: product[id]
        });
    }
    );

});


router.post('/', (req, res, next) => {


    product_input = {

        "id": req.body.id,
        "name": req.body.name,
        "qty": req.body.qty,
        "price": req.body.price

    };



    product.push(product_input);
    // console.log(sample_product);


    fs.writeFile('./product.json', JSON.stringify(product), (err) => {


        if (err) throw err;
        console.log("Data is appended successfully");

    });


    res.status(200).json({

        message: 'Handling post request to /products',


    });

});

//PUT method 
router.put('/:id', (req, res, next) => {
    var id = req.params.id;

    read.then(product => JSON.parse(product)).then(product => {

        console.log(product);
        product_input = {

            "id": req.body.id,
            "name": req.body.name,
            "qty": req.body.qty,
            "price": req.body.price

        };


        product[id] = product_input;


        fs.writeFile('./product.json', JSON.stringify(product), (err) => {


            if (err) throw err;
            console.log("Data is appended successfully");

        });




        res.status(200).json({

            message: 'Handling PUT request to /products',


        });

    });

});

//DELETE method to delete the particular element from the products

router.delete("/:id", (req, res, next) => {

    read.then(product => JSON.parse(product)).then(product => {
       
  var id=req.params.id;  
        console.log(product,id);

        var sample_product;


        sample_product=product.forEach((d,index)=>{
           
           if(d.id===id){
               product.splice(index,1);
               console.log(product);
               return product;
               
            }
            else
             return "Not found"; 
        
        });

        console.log(sample_product);
       //const arr=product.map(d=>d.id);
       //console.log(arr);
    //    product=product.filter((d,index)=>{
    //        if(d.id===id){d.splice(index,1);
    //        return d;}
    //        else
    //        return "not found";

    //    });

       res.status(200).json({

        message:"Handle delete request from the /products",
        product:sample_product

       });
}).catch(err=>console.log(err));
});


module.exports = router;