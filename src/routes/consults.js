const express= require('express');

const router = express.Router();
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "12345"));
const session3= driver.session();

//Models
const Market = require("../models/markets");
const Product = require("../models/products");

//consult 1



  router.get('/consult1',async(req,res)=>{
    var clientUsername = req.body.clientUsername;
    var client = clientUsername;

        session3
        .run('MATCH (n:Orders) where n.clientUsername= "'+client+'" RETURN n')
        .then(function(result1){
            var orderArr = [];
            result1.records.forEach(function(record){
                orderArr.push({
                    id: record._fields[0].identity.low,
                    name: record._fields[0].properties.name

                });
            })
            var oders = orderArr;
            console.log(oders);
            //res.render('consults/consult1',{orders:orderArr})
            })
        .catch(function(err){
   console.log(err);
            })  
        });

//Consulta2


router.get('/consult2', (req,res)=>{
    var errors=[];
    session3
    .run('MATCH (a)-[:Place_Order]->(b) RETURN b.name, COLLECT(a) as Orders ORDER BY SIZE(Orders) DESC LIMIT 100')
    .then(function(result1){
        var purchases = result1.records[0]._fields[0]
        console.log(purchases);
       // res.render("/consults/viewConsult2"); 
    })
    .catch(function(err){
        errors.push({text:"There aren't purchases in the database"})
        console.log("fallo");
       // res.render("/consults/viewConsult2"); 
    })
})

//consulta 3
router.get('/consults/consult3', async (req,res)=>{
    
    var errors=[];

    session3
    .run('MATCH (a)-[:Place_Order]->(b) RETURN b.name, COLLECT(a) as Orders ORDER BY SIZE(Orders) DESC LIMIT 5')
    .then(function(result){
        var final =result.records[0]._fields[0]
        console.log(final);

        //res.render("consults/showConsult3",{
            //final
        //});
        
    })
    .catch(function(err){
        //errors.push({text:"Error"})
        //res.render("consults/menuConsults",{
            //errors
            console.log("fallo");
    })
})
/*
//consutla 4
router.post('/consults/consult4',async(req,res)=>{
    var idClient=req.body.idClient;
    var success=[];
    var errors=[];

    if(!idClient){
        errors.push({text:"You must enter the id of the client"});
    }else{
        session3//saca el cliente
        .run('MATCH (c:Client) where c.idClient="'+idClient+'" return c')
        .then(function(result1){
            console.log(result1.records[0]._fields[0].properties.idClient)

            session3//saca el supermercado
            .run('MATCH (p:Purchases) where p.client="'+result1.records[0]._fields[0].properties.idClient+'" return p')
            .then(function(result2){
                console.log(result2.records[0]._fields[0].properties.supermarketName);

                session3//saca el pedido en la misma sucursal
                .run('MATCH (p:Purchases) where not p.client="'+result2.records[0]._fields[0].properties.idClient+'" and p.supermarketName="'+result2.records[0]._fields[0].properties.supermarketName+'"  return p')
                .then(function(result3){

                    session3//saca toda la información del cliente encontrado
                    .run('MATCH (p:Client) where p.idClient="'+result3.records[0]._fields[0].properties.client+'" return p')
                    .then(function(result4){

                        var clienteSimilar =result4.records[0]._fields[0].properties;
                        var supermarket=result2.records[0]._fields[0].properties.supermarketName;
                        console.log(clienteSimilar)

                        res.render("consults/showConsult",{
                            clienteSimilar,
                            supermarket
                        });

                    })
                    .catch(function(err){
                        errors.push({text:"The related client was not found"})
                        res.render("consults/consult4",{
                            errors
                        });
                    })

                })
                .catch(function(err){
                    errors.push({text:"There are not more purchases in that supermarket"})
                    res.render("consults/consult4",{
                        errors
                    });
                })

            })
            .catch(function(err){
                errors.push({text:"That client does not have purchases"})
                res.render("consults/consult4",{
                    errors
                });
            })

        })
        .catch(function(err){
            errors.push({text:"The client does not exist in the database"})
            res.render("consults/consult4",{
                errors
            });
        })
    }
})

//consulta 5
router.post('/consults/consult5',async(req,res)=>{
    var idClient=req.body.idClient;
    var success=[];
    var errors=[];
    var arrayFinaLProductos=[];

    if(!idClient){
        errors.push({text:"You must enter the id of the client"});
    }else{
        session3
        .run('MATCH (c:Client),(p:Purchases) where not c.idClient="'+idClient+'" and c.idClient=p.client return c')
        .then(function(result1){ 
            console.log(result1.records[0]._fields[0].properties)

            session3
            .run('MATCH (p:Purchases) where p.client="'+result1.records[0]._fields[0].properties.idClient+'" return p')
            .then(function(result2){ 
                var ids= String(result2.records[0]._fields[0].properties.products).split(",")
                
                console.log(ids)

                var contadorPorductos=1;
                while(ids.length>contadorPorductos){
                    

                    session3
                    .run('MATCH (p:Product) where p.idProduct="'+ids[contadorPorductos]+'" return p')
                    .then(function(result){
                        var x =result.records[0]._fields[0].properties.name
                        console.log(x)
                        res.render("consults/showConsult5",{
                            x
                        });
                        
                    })
                    .catch(function(err){
                        errors.push({text:"There are not products"})
                        res.render("consults/consult5",{
                            errors
                        });
                    })
                    contadorPorductos+=1
                }
                console.log(arrayFinaLProductos)
            })
            .catch(function(err){
                errors.push({text:"The rest of the clients do not have purchases"})
                res.render("consults/consult5",{
                    errors
                });
            })
        })
        .catch(function(err){
            errors.push({text:"There are not more clients"})
            res.render("consults/consult5",{
                errors
            });
        })

    } 

})


*/

module.exports = router;