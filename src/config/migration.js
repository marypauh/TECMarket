var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '12345'));
var session = driver.session();

const Markets = require('../models/markets');
const Users = require('../models/users');
const Products = require('../models/products');
const Orders = require('../models/orders');

module.exports = async()=>{
    session
        .run('MATCH (n)DETACH  DELETE n')
        .then(function(result){
            session.close();                
        })
        .catch(function(err){
            console.log(err);
        })

    const adminMongoClients = await Users.find({type: 2});
    for(var i = 0; i < adminMongoClients.length; i++){
        const client = adminMongoClients[i];
       // console.log(client);
        //const idUser = client.idUser;
        const nameParam = client.name;
        const emailParam = client.email;
        const telephoneParam = client.telephone;
        const dateUParam = client.dateU;
        const typeParam = client.type;
        const usernameParam = client.username;
        const passwordParam = client.password;
       // console.log(nameParam);
 

        session
        .run('CREATE (n:Clients {name: {nameP},email:{emailP},telephone:{telephoneP},type:{typeP},username:{usernameP}}) Return n',
        {nameP:nameParam,emailP:emailParam,telephoneP:telephoneParam,typeP:typeParam,usernameP:usernameParam})
        .then(function(result){
            session.close();
            console.log("eerr");                
        })
        .catch(function(err){
            console.log("error");
            console.log(err);
        })
    };

    const adminMongoEmployees = await Users.find({type: 1});
    for(var i = 0; i < adminMongoEmployees.length; i++){
        const employee = adminMongoEmployees[i];
       // console.log(employee);
        //const idUser = client.idUser;
        const nameParam = employee.name;
        const emailParam = employee.email;
        const telephoneParam = employee.telephone;
        const dateUParam = employee.dateU;
        const typeParam = employee.type;
        const usernameParam = employee.username;
        const passwordParam = employee.password;
       // console.log(nameParam);
 

        session
        .run('CREATE (n:Employees {name: {nameP},email:{emailP},telephone:{telephoneP},type:{typeP},username:{usernameP}}) Return n',
        {nameP:nameParam,emailP:emailParam,telephoneP:telephoneParam,typeP:typeParam,usernameP:usernameParam})
        .then(function(result){
            session.close();
            console.log("eerr");                
        })
        .catch(function(err){
            console.log("error");
            console.log(err);
        })
    };

    const productsMongo = await Products.find();
    for(var i = 0; i < productsMongo.length; i++){
        const product = productsMongo[i];
       // console.log(product);
        const idPr = product.idProduct;
        const nameP = product.name;
        const descriptionP = product.description;
        const quantityP = product.quantity;

        session
        .run('CREATE (n:Products {idProduct: {idP}, name: {namePr},description:{desP},quantity:{quantP}}) Return n',
        {idP :idPr, namePr :nameP,desP:descriptionP,quantP:quantityP})
        .then(function(result){
            session.close();
            console.log("eerr");                
        })
        .catch(function(err){
            console.log("error");
            console.log(err);
        })
    };
    const marketsMongo = await Markets.find();
    for(var i = 0; i < marketsMongo.length; i++){
        const market = marketsMongo[i];
        //console.log(market);
        const nameM = market.name;
        const descriptionM = market.description;
        const latM = market.latitude;
        const lonM = market.length;
        const directionM = market.direction;

        session
        .run('CREATE (n:Markets {name: {nameMk}, description:{desM}, latitude:{lat}, length:{len},dirrection:{dir}}) Return n',
        {nameMk :nameM, desM:descriptionM, lat:latM, len: lonM, dir: directionM})
        .then(function(result){
            session.close();
            console.log("eerr");                
        })
        .catch(function(err){
            console.log("error");
            console.log(err);
        })

    };
    const orderMongo = await Orders.find();
    for(var i = 0; i < orderMongo.length; i++){
        const order = orderMongo[i];
       // console.log(order);
        const idOrd = order.idOrder;
        const totalO = order.total;
        const hourO = order.hour;
        const stateO = order.state;
        const needsO = order.needs;

        const client = order.clientUsername;
        const nameMark = order.market;
        const productsO = order.products;
        const quantityO = order.quantityProducts;
       // console.log(idOrd); 
        //console.log(hourO); 

      
//The node is created in Neo4j
        session
        .run('CREATE (n:Orders {idOrder: {idO}, total: {tO}, hour: {hO} , state: {sO}, needs: {nO}}) Return n',
        {idO: idOrd, tO:totalO, hO:hourO, sO: stateO, nO: needsO, marketN:nameMark})
        .then(function(result){
            session.close();
           console.log("orden");                
        })
        .catch(function(err){
            console.log("errorCreate");
            console.log(err);
        })


//The relationship between the order and the client is created
        session
        .run('MATCH (a:Orders {idOrder: {idO}}), (b:Clients {username:{cO}}) MERGE (a) - [r:Made_an_order] -> (b) set a.clientUsername = {cO}', {idO:idOrd, cO:client, marketN:nameMark})
        .then(function(result){
            session.close();
            console.log("cliente");                
        })
        .catch(function(err){
            console.log("errorCliente");
            console.log(err);
        })

//The relationship between the order and the market is created
        session
        .run('MATCH (a:Orders {idOrder: {idO}}), (b:Markets {name:{marketN}}) MERGE (a) - [r:Place_Order] -> (b) set a.market = {marketN}', {idO:idOrd, marketN:nameMark})
        .then(function(result){
            session.close();
            console.log("market");                
        })
        .catch(function(err){
            console.log("errorMarket");
            console.log(err);
        })
  
//The relationship between the order and the products is created     
        for(var j = 0; j < productsO.length; j++){
            const prO = productsO[j];
        session
        .run(' MATCH (a: Orders {idOrder: {idO}}) , (b:Products {idProduct: {prO}}) MERGE (a) -[r:In]->(b) set a.quantityProducts = 5', {idO:idOrd, prO:productsO[j]})
        .then(function(result){
            session.close();
            console.log("productos");                
        })
        .catch(function(err){
            console.log("errorProductos");
            console.log(err);
        })
 
  }

    };
}