const express= require('express');

const router = express.Router();
const neo4j = require("neo4j-driver").v1;
const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "12345"));
const session3= driver.session();

//Models
const Market = require("../models/markets");
const Product = require("../models/products");

//consult 1

router.get('/consult1', (req,res)=>{
    res.render("consults/get1");
})

router.post('/consults/consult1',async(req,res)=>{
    var clientUsername=req.body.clientUsername;
    var errors=[];

    if(clientUsername){
        session3
        .run('MATCH (n:Orders) where n.clientUsername= "'+clientUsername+'" RETURN n')
        .then(function(result1){
            var order1=result1.records[0]._fields[0].properties
            var order2=result1.records[1]._fields[0].properties
            var order3=result1.records[2]._fields[0].properties

            res.render("consults/consult1",{order1,order2,order3
            });
        })
        .catch(function(err){
          console.log(err);
            })

    }
})

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

//consutla 4

router.get('/consult4', (req,res)=>{
    res.render("consults/get4");
})

router.post('/consults/consult4',async(req,res)=>{
    var clientUsername=req.body.clientUsername;
    var success=[];
    var errors=[];

    if(clientUsername){

        session3//saca el cliente
        .run('MATCH (n:Clients) where n.username= "'+clientUsername+'" RETURN n')
        .then(function(result1){
            console.log(result1.records[0]._fields[0].properties.clientUsername)

            session3//saca el supermercado
            .run('MATCH (n:Orders) where n.clientUsername="'+result1.records[0]._fields[0].properties.clientUsername+'" return n')
            .then(function(result2){
                console.log(result2.records[0]._fields[0].properties.market);

                session3//saca el pedido en la misma sucursal
                .run('MATCH (n:Orders) where not n.clientUsername="'+result2.records[0]._fields[0].properties.clientUsername+'" and n.market="'+result2.records[0]._fields[0].properties.market+'"  return n')
                .then(function(result3){

                    session3//saca toda la información del cliente encontrado
                    .run('MATCH (n:Clients) where n.clientUsername="'+result3.records[0]._fields[0].properties.clientUsername+'" return n')
                    .then(function(result4){

                        var client1 =result4.records[0]._fields[0].properties;
                        var market1=result2.records[0]._fields[0].properties.market;
                        var client2 =result4.records[1]._fields[0].properties;
                        var market2=result2.records[1]._fields[0].properties.market;
                        var client3 =result4.records[2]._fields[0].properties;
                        var market3=result2.records[2]._fields[0].properties.market;

                        res.render("consults/consult4",{
                            client1, client2, client3,
                            market1, market2, market3
                        });

                    })
                    .catch(function(err){
                        errors.push({text:"The related client was not found"})
                        res.render("consults/get4",{
                            errors
                        });
                    })

                })
                .catch(function(err){
                    errors.push({text:"There are not more purchases in that supermarket"})
                    res.render("consults/get4",{
                        errors
                    });
                })

            })
            .catch(function(err){
                errors.push({text:"That client does not have purchases"})
                res.render("consults/get4",{
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

module.exports = router;